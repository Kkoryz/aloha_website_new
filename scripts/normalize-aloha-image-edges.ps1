param(
  [int]$Border = 10
)

$ErrorActionPreference = 'Stop'

$outDir = Join-Path (Get-Location) 'public\product-images\aloha-generated'
if (-not (Test-Path -LiteralPath $outDir)) {
  throw "Missing generated image directory: $outDir"
}

Add-Type -AssemblyName System.Drawing

$background = [Drawing.ColorTranslator]::FromHtml('#fbfaf7')
$files = Get-ChildItem -LiteralPath $outDir -File |
  Where-Object {
    $_.Name -match '^(XLSX|AL).+-(flat|model)\.png$' -and
    $_.Name -notmatch '^XLSX-5[1-4]-'
  }

foreach ($file in $files) {
  $source = [Drawing.Bitmap]::FromFile($file.FullName)
  $canvas = New-Object Drawing.Bitmap $source.Width, $source.Height
  $graphics = [Drawing.Graphics]::FromImage($canvas)
  $brush = New-Object Drawing.SolidBrush $background

  try {
    $graphics.Clear($background)
    $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($source, 0, 0, $source.Width, $source.Height)

    $w = $canvas.Width
    $h = $canvas.Height
    $b = [Math]::Min($Border, [Math]::Floor([Math]::Min($w, $h) / 8))

    $graphics.FillRectangle($brush, 0, 0, $w, $b)
    $graphics.FillRectangle($brush, 0, $h - $b, $w, $b)
    $graphics.FillRectangle($brush, 0, 0, $b, $h)
    $graphics.FillRectangle($brush, $w - $b, 0, $b, $h)
  }
  finally {
    $brush.Dispose()
    $graphics.Dispose()
    $source.Dispose()
  }

  $tmp = "$($file.FullName).tmp"
  try {
    $canvas.Save($tmp, [Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $canvas.Dispose()
  }

  Move-Item -LiteralPath $tmp -Destination $file.FullName -Force
}

Get-ChildItem -LiteralPath $outDir -File |
  Where-Object { $_.Name -match '^(XLSX|AL).+-(flat|model)\.png$' -and $_.Name -notmatch '^XLSX-5[1-4]-' } |
  Measure-Object |
  Select-Object Count
