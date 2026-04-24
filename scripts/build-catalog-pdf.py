from __future__ import annotations

import re
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE_PDF = ROOT / 'Aloha_Co_Combined_Catalog_2026.pdf'
TARGET_PDF = ROOT / 'public' / 'catalog.pdf'
REMOVED_PAGE_OBJECT = 67

# Replace a few lifestyle/catalog images with visuals already used on the site.
IMAGE_REPLACEMENTS = {
    88: ROOT / 'public' / 'READY DESIGN COLLECTION.png',
    96: ROOT / 'public' / 'LAUNCH WITH CONFIDENCE.png',
    99: ROOT / 'public' / 'PREFER CUSTOM DESIGNS.png',
    172: ROOT / 'public' / 'hero.png',
    575: ROOT / 'public' / 'Explore Our FABRICS.png',
    680: ROOT / 'public' / 'family.png',
    739: ROOT / 'public' / 'pool.png',
    740: ROOT / 'public' / 'family.png',
}


def object_bytes(pdf: bytes, obj_number: int) -> bytes:
    needle = f'{obj_number} 0 obj'.encode()
    start = pdf.find(needle)
    if start < 0:
        raise ValueError(f'Object {obj_number} not found.')
    end = pdf.find(b'endobj', start)
    if end < 0:
        raise ValueError(f'Object {obj_number} has no endobj marker.')
    return pdf[start:end + len(b'endobj')]


def object_text(pdf: bytes, obj_number: int) -> str:
    return object_bytes(pdf, obj_number).decode('latin1', errors='ignore')


def parse_pages_object(pdf: bytes) -> tuple[list[int], int]:
    pages_object = object_text(pdf, 2)
    kids_match = re.search(r'/Kids \[(.*?)\]', pages_object, re.S)
    count_match = re.search(r'/Count (\d+)', pages_object)

    if not kids_match or not count_match:
        raise ValueError('Could not parse the /Pages tree.')

    page_refs = [int(ref) for ref in re.findall(r'(\d+) 0 R', kids_match.group(1))]
    return page_refs, int(count_match.group(1))


def parse_dimensions(pdf: bytes, obj_number: int) -> tuple[int, int]:
    text = object_text(pdf, obj_number)
    width_match = re.search(r'/Width (\d+)', text)
    height_match = re.search(r'/Height (\d+)', text)

    if not width_match or not height_match:
        raise ValueError(f'Could not parse image dimensions for object {obj_number}.')

    return int(width_match.group(1)), int(height_match.group(1))


def build_pages_object(page_refs: list[int]) -> bytes:
    refs = ' '.join(f'{page_ref} 0 R' for page_ref in page_refs)
    return (
        '2 0 obj\n'
        '<<\n'
        '/Type /Pages\n'
        f'/Count {len(page_refs)}\n'
        f'/Kids [ {refs} ]\n'
        '>>\n'
        'endobj\n'
    ).encode('ascii')


def build_image_object(obj_number: int, source_path: Path, size: tuple[int, int]) -> bytes:
    with Image.open(source_path) as source_image:
        prepared = ImageOps.fit(
            source_image.convert('RGB'),
            size,
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
        buffer = BytesIO()
        prepared.save(buffer, format='JPEG', quality=91, optimize=True)
        image_bytes = buffer.getvalue()

    header = (
        f'{obj_number} 0 obj\n'
        '<<\n'
        '/Type /XObject\n'
        '/Subtype /Image\n'
        f'/Width {size[0]}\n'
        f'/Height {size[1]}\n'
        '/ColorSpace /DeviceRGB\n'
        '/BitsPerComponent 8\n'
        '/Filter /DCTDecode\n'
        f'/Length {len(image_bytes)}\n'
        '>>\n'
        'stream\n'
    ).encode('ascii')

    return header + image_bytes + b'\nendstream\nendobj\n'


def parse_trailer(pdf: bytes) -> tuple[int, str, str | None, int]:
    trailer_match = re.search(
        rb'trailer\s*<<(.*?)>>\s*startxref\s+(\d+)\s+%%EOF\s*$',
        pdf,
        re.S,
    )
    if not trailer_match:
        raise ValueError('Could not find PDF trailer.')

    trailer_text = trailer_match.group(1).decode('latin1', errors='ignore')
    startxref = int(trailer_match.group(2))
    size_match = re.search(r'/Size (\d+)', trailer_text)
    root_match = re.search(r'/Root (\d+ \d+ R)', trailer_text)
    info_match = re.search(r'/Info (\d+ \d+ R)', trailer_text)

    if not size_match or not root_match:
        raise ValueError('Could not parse trailer metadata.')

    return int(size_match.group(1)), root_match.group(1), info_match.group(1) if info_match else None, startxref


def build_xref(offsets: dict[int, int]) -> bytes:
    sections: list[list[int]] = []
    current: list[int] = []

    for obj_number in sorted(offsets):
        if not current or obj_number == current[-1] + 1:
            current.append(obj_number)
            continue
        sections.append(current)
        current = [obj_number]

    if current:
        sections.append(current)

    parts = [b'xref\n']
    for section in sections:
        parts.append(f'{section[0]} {len(section)}\n'.encode('ascii'))
        for obj_number in section:
            parts.append(f'{offsets[obj_number]:010d} 00000 n \n'.encode('ascii'))

    return b''.join(parts)


def main() -> None:
    original_pdf = SOURCE_PDF.read_bytes()
    page_refs, original_count = parse_pages_object(original_pdf)
    size, root_ref, info_ref, startxref = parse_trailer(original_pdf)

    filtered_page_refs = [page_ref for page_ref in page_refs if page_ref != REMOVED_PAGE_OBJECT]
    if len(filtered_page_refs) != original_count - 1:
        raise ValueError('Unexpected page count while removing the catalog third page.')

    base_pdf = original_pdf if original_pdf.endswith(b'\n') else original_pdf + b'\n'
    appended = bytearray()
    offsets: dict[int, int] = {}

    def append_object(obj_number: int, content: bytes) -> None:
        offsets[obj_number] = len(base_pdf) + len(appended)
        appended.extend(content)

    append_object(2, build_pages_object(filtered_page_refs))

    for obj_number, image_path in IMAGE_REPLACEMENTS.items():
        append_object(
            obj_number,
            build_image_object(obj_number, image_path, parse_dimensions(original_pdf, obj_number)),
        )

    xref_offset = len(base_pdf) + len(appended)
    trailer_lines = [
        b'trailer\n',
        b'<<\n',
        f'/Size {size}\n'.encode('ascii'),
        f'/Root {root_ref}\n'.encode('ascii'),
        *([f'/Info {info_ref}\n'.encode('ascii')] if info_ref else []),
        f'/Prev {startxref}\n'.encode('ascii'),
        b'>>\n',
        b'startxref\n',
        f'{xref_offset}\n'.encode('ascii'),
        b'%%EOF\n',
    ]

    output = base_pdf + appended + build_xref(offsets) + b''.join(trailer_lines)
    TARGET_PDF.write_bytes(output)

    print(f'Wrote {TARGET_PDF}')
    print(f'Pages: {len(filtered_page_refs)} (removed object {REMOVED_PAGE_OBJECT})')
    print(f'Patched image objects: {", ".join(str(obj) for obj in sorted(IMAGE_REPLACEMENTS))}')


if __name__ == '__main__':
    main()
