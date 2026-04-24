param(
  [Parameter(Mandatory = $true)]
  [string]$Id,
  [string]$SourcePath = '',
  [double]$ModelTopTrimRatio = 0.06
)

$ErrorActionPreference = 'Stop'

if ($SourcePath) {
  $source = Get-Item -LiteralPath $SourcePath
}
else {
  $source = Get-ChildItem -Path "$env:USERPROFILE\.codex\generated_images" -Recurse -File -Include *.png |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1
}

if (-not $source) {
  throw 'No generated image found under CODEX generated_images.'
}

$outDir = Join-Path (Get-Location) 'public\product-images\aloha-generated'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$comboPath = Join-Path $outDir "$Id-combo.png"
if ([IO.Path]::GetFullPath($source.FullName) -ne [IO.Path]::GetFullPath($comboPath)) {
  Copy-Item -LiteralPath $source.FullName -Destination $comboPath -Force
}

Add-Type -AssemblyName System.Drawing

function Save-FittedPanel {
  param(
    [Parameter(Mandatory = $true)]
    [Drawing.Image]$SourceImage,
    [Parameter(Mandatory = $true)]
    [Drawing.Rectangle]$Crop,
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  $canvasW = 800
  $canvasH = 1000
  $canvas = New-Object Drawing.Bitmap $canvasW, $canvasH
  $graphics = [Drawing.Graphics]::FromImage($canvas)

  try {
    $graphics.Clear([Drawing.ColorTranslator]::FromHtml('#fbfaf7'))
    $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $scale = [Math]::Min($canvasW / $Crop.Width, $canvasH / $Crop.Height)
    $drawW = [int]($Crop.Width * $scale)
    $drawH = [int]($Crop.Height * $scale)
    $x = [int](($canvasW - $drawW) / 2)
    $y = [int](($canvasH - $drawH) / 2)

    $graphics.DrawImage(
      $SourceImage,
      [Drawing.Rectangle]::new($x, $y, $drawW, $drawH),
      $Crop,
      [Drawing.GraphicsUnit]::Pixel
    )

    $canvas.Save($Path, [Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $graphics.Dispose()
    $canvas.Dispose()
  }
}

$image = [Drawing.Image]::FromFile($source.FullName)

try {
  $halfWidth = [int]($image.Width / 2)

  Save-FittedPanel `
    -SourceImage $image `
    -Crop ([Drawing.Rectangle]::new(0, 0, $halfWidth, $image.Height)) `
    -Path (Join-Path $outDir "$Id-flat.png")

  $modelTopTrim = [int]($image.Height * $ModelTopTrimRatio)
  Save-FittedPanel `
    -SourceImage $image `
    -Crop ([Drawing.Rectangle]::new($halfWidth, $modelTopTrim, $image.Width - $halfWidth, $image.Height - $modelTopTrim)) `
    -Path (Join-Path $outDir "$Id-model.png")
}
finally {
  $image.Dispose()
}

Get-ChildItem $outDir -Filter "$Id-*.png" |
  Select-Object Name, Length, LastWriteTime
