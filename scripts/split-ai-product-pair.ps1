param(
  [Parameter(Mandatory = $true)]
  [string]$Source,
  [Parameter(Mandatory = $true)]
  [string]$FlatOut,
  [Parameter(Mandatory = $true)]
  [string]$ModelOut
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

function Save-Panel {
  param(
    [Drawing.Bitmap]$SourceBitmap,
    [Drawing.Rectangle]$Crop,
    [string]$OutPath
  )

  $canvas = New-Object Drawing.Bitmap 800, 1000
  $graphics = [Drawing.Graphics]::FromImage($canvas)
  $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([Drawing.ColorTranslator]::FromHtml('#fbfaf7'))

  $scale = [Math]::Min(800 / $Crop.Width, 1000 / $Crop.Height)
  $drawW = [int]($Crop.Width * $scale)
  $drawH = [int]($Crop.Height * $scale)
  $drawX = [int]((800 - $drawW) / 2)
  $drawY = [int]((1000 - $drawH) / 2)
  $dest = [Drawing.Rectangle]::new($drawX, $drawY, $drawW, $drawH)

  $graphics.DrawImage($SourceBitmap, $dest, $Crop, [Drawing.GraphicsUnit]::Pixel)
  $canvas.Save($OutPath, [Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $canvas.Dispose()
}

$image = [Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $Source))
try {
  $half = [int]($image.Width / 2)
  $flatCrop = [Drawing.Rectangle]::new(0, 0, $half, $image.Height)
  $modelCrop = [Drawing.Rectangle]::new($half, 0, $image.Width - $half, $image.Height)

  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $FlatOut) | Out-Null
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $ModelOut) | Out-Null
  Save-Panel -SourceBitmap $image -Crop $flatCrop -OutPath $FlatOut
  Save-Panel -SourceBitmap $image -Crop $modelCrop -OutPath $ModelOut
}
finally {
  $image.Dispose()
}
