param(
  [switch]$Overwrite,
  [string[]]$Ids = @()
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = Get-Location
$promptPath = Join-Path $root 'docs\image-prompts\4.8-aloha-catalog-prompts.json'
$outDir = Join-Path $root 'public\product-images\aloha-generated'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$products = Get-Content -Raw -Path $promptPath | ConvertFrom-Json

function New-Canvas {
  $bitmap = New-Object Drawing.Bitmap 800, 1000
  $graphics = [Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.Clear([Drawing.ColorTranslator]::FromHtml('#fbfaf7'))
  return @{ Bitmap = $bitmap; Graphics = $graphics }
}

function New-PathFromPoints {
  param([Drawing.PointF[]]$Points)

  $path = New-Object Drawing.Drawing2D.GraphicsPath
  $path.AddPolygon($Points)
  return $path
}

function Get-Seed {
  param([string]$Id)

  $seed = 17
  foreach ($char in $Id.ToCharArray()) {
    $seed = (($seed * 31) + [int][char]$char) -band 0x7fffffff
  }
  return $seed
}

function Get-ColorSet {
  param([string]$Pattern)

  $patternLower = $Pattern.ToLowerInvariant()
  if ($patternLower.Contains('green')) {
    return @('#2f6f3e', '#7fb069', '#f8f1c2', '#0f3552', '#ffffff')
  }
  if ($patternLower.Contains('teal')) {
    return @('#0b5d63', '#e9d88d', '#f4f0dc', '#183d3b', '#ffffff')
  }
  if ($patternLower.Contains('mint')) {
    return @('#d9fff0', '#38b6a3', '#f7d36f', '#145c63', '#ffffff')
  }
  if ($patternLower.Contains('bag')) {
    return @('#f6efe1', '#15324a', '#62a6a1', '#e3b358', '#ffffff')
  }
  return @('#d8edf8', '#12517f', '#ffffff', '#86b7d6', '#0b2b45')
}

function Get-PromptField {
  param([string]$Prompt, [string]$Field)

  $regex = [regex]::Escape($Field) + ': ([^\r\n]+)'
  $match = [regex]::Match($Prompt, $regex)
  if ($match.Success) { return $match.Groups[1].Value.Trim() }
  return ''
}

function Convert-HexColor {
  param([string]$Hex)

  return [Drawing.ColorTranslator]::FromHtml($Hex)
}

function Draw-Pattern {
  param(
    [Drawing.Graphics]$Graphics,
    [Drawing.Drawing2D.GraphicsPath]$ClipPath,
    [string[]]$Palette,
    [int]$Seed,
    [Drawing.RectangleF]$Bounds
  )

  $oldClip = $Graphics.Clip
  $Graphics.SetClip($ClipPath)
  $random = New-Object Random $Seed

  for ($i = 0; $i -lt 28; $i++) {
    $color = Convert-HexColor $Palette[$random.Next(0, $Palette.Count)]
    $brush = New-Object Drawing.SolidBrush $color
    $x = [float]($Bounds.Left + $random.NextDouble() * $Bounds.Width)
    $y = [float]($Bounds.Top + $random.NextDouble() * $Bounds.Height)
    $w = [float](28 + $random.NextDouble() * 68)
    $h = [float](10 + $random.NextDouble() * 26)
    $angle = [float]($random.NextDouble() * 180)

    $state = $Graphics.Save()
    $Graphics.TranslateTransform($x, $y)
    $Graphics.RotateTransform($angle)
    $Graphics.FillEllipse($brush, -$w / 2, -$h / 2, $w, $h)
    $Graphics.Restore($state)
    $brush.Dispose()
  }

  for ($i = 0; $i -lt 16; $i++) {
    $brush = New-Object Drawing.SolidBrush (Convert-HexColor $Palette[$random.Next(0, $Palette.Count)])
    $x = [float]($Bounds.Left + $random.NextDouble() * $Bounds.Width)
    $y = [float]($Bounds.Top + $random.NextDouble() * $Bounds.Height)
    $size = [float](18 + $random.NextDouble() * 46)
    $Graphics.FillEllipse($brush, $x, $y, $size, $size)
    $brush.Dispose()
  }

  $Graphics.Clip = $oldClip
}

function Fill-ShapeWithPattern {
  param(
    [Drawing.Graphics]$Graphics,
    [Drawing.Drawing2D.GraphicsPath]$Path,
    [string[]]$Palette,
    [int]$Seed
  )

  $baseBrush = New-Object Drawing.SolidBrush (Convert-HexColor $Palette[0])
  $Graphics.FillPath($baseBrush, $Path)
  Draw-Pattern -Graphics $Graphics -ClipPath $Path -Palette $Palette -Seed $Seed -Bounds $Path.GetBounds()
  $pen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(34, 255, 255, 255)), 2
  $Graphics.DrawPath($pen, $Path)
  $pen.Dispose()
  $baseBrush.Dispose()
}

function Draw-ShirtFlat {
  param($Graphics, $Palette, $Seed, [string]$Style)

  $points = [Drawing.PointF[]]@(
    [Drawing.PointF]::new(245, 240),
    [Drawing.PointF]::new(320, 185),
    [Drawing.PointF]::new(480, 185),
    [Drawing.PointF]::new(555, 240),
    [Drawing.PointF]::new(610, 340),
    [Drawing.PointF]::new(555, 395),
    [Drawing.PointF]::new(540, 760),
    [Drawing.PointF]::new(260, 760),
    [Drawing.PointF]::new(245, 395),
    [Drawing.PointF]::new(190, 340)
  )
  $path = New-PathFromPoints $points
  Fill-ShapeWithPattern -Graphics $Graphics -Path $path -Palette $Palette -Seed $Seed

  $collarBrush = New-Object Drawing.SolidBrush (Convert-HexColor $Palette[1])
  $Graphics.FillPolygon($collarBrush, [Drawing.PointF[]]@(
    [Drawing.PointF]::new(320, 185),
    [Drawing.PointF]::new(395, 258),
    [Drawing.PointF]::new(365, 300),
    [Drawing.PointF]::new(305, 215)
  ))
  $Graphics.FillPolygon($collarBrush, [Drawing.PointF[]]@(
    [Drawing.PointF]::new(480, 185),
    [Drawing.PointF]::new(395, 258),
    [Drawing.PointF]::new(435, 300),
    [Drawing.PointF]::new(495, 215)
  ))
  $placketPen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(60, 255, 255, 255)), 3
  if ($Style -match 'Polo|Half') {
    $Graphics.DrawLine($placketPen, 400, 255, 400, 385)
  }
  else {
    $Graphics.DrawLine($placketPen, 400, 220, 400, 760)
  }
  $collarBrush.Dispose()
  $placketPen.Dispose()
  $path.Dispose()
}

function Draw-DressFlat {
  param($Graphics, $Palette, $Seed, [bool]$IsKids)

  $topY = if ($IsKids) { 235 } else { 185 }
  $hemY = if ($IsKids) { 760 } else { 860 }
  $points = [Drawing.PointF[]]@(
    [Drawing.PointF]::new(315, $topY),
    [Drawing.PointF]::new(485, $topY),
    [Drawing.PointF]::new(620, $hemY),
    [Drawing.PointF]::new(180, $hemY)
  )
  $path = New-PathFromPoints $points
  Fill-ShapeWithPattern -Graphics $Graphics -Path $path -Palette $Palette -Seed $Seed
  $pen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(65, 255, 255, 255)), 6
  $Graphics.DrawLine($pen, 305, $topY + 58, 495, $topY + 58)
  if ($IsKids) {
    $Graphics.DrawArc($pen, 180, $hemY - 70, 440, 90, 0, 180)
  }
  $pen.Dispose()
  $path.Dispose()
}

function Draw-SwimFlat {
  param($Graphics, $Palette, $Seed, [string]$Style)

  $top = New-PathFromPoints ([Drawing.PointF[]]@(
    [Drawing.PointF]::new(240, 260),
    [Drawing.PointF]::new(560, 260),
    [Drawing.PointF]::new(525, 390),
    [Drawing.PointF]::new(275, 390)
  ))
  Fill-ShapeWithPattern -Graphics $Graphics -Path $top -Palette $Palette -Seed $Seed

  $bottom = New-PathFromPoints ([Drawing.PointF[]]@(
    [Drawing.PointF]::new(295, 560),
    [Drawing.PointF]::new(505, 560),
    [Drawing.PointF]::new(545, 735),
    [Drawing.PointF]::new(400, 815),
    [Drawing.PointF]::new(255, 735)
  ))
  Fill-ShapeWithPattern -Graphics $Graphics -Path $bottom -Palette $Palette -Seed ($Seed + 17)

  if ($Style -match 'Tie|Straps') {
    $pen = New-Object Drawing.Pen (Convert-HexColor $Palette[1]), 7
    $Graphics.DrawLine($pen, 300, 260, 260, 185)
    $Graphics.DrawLine($pen, 500, 260, 540, 185)
    $pen.Dispose()
  }
  $top.Dispose()
  $bottom.Dispose()
}

function Draw-BagFlat {
  param($Graphics, $Palette, $Seed)

  $bag = New-Object Drawing.Drawing2D.GraphicsPath
  $bag.AddRectangle([Drawing.RectangleF]::new(220, 270, 360, 470))
  Fill-ShapeWithPattern -Graphics $Graphics -Path $bag -Palette $Palette -Seed $Seed
  $pen = New-Object Drawing.Pen (Convert-HexColor $Palette[1]), 12
  $Graphics.DrawArc($pen, 300, 155, 200, 210, 190, 160)
  $pen.Dispose()
  $bag.Dispose()
}

function Draw-ModelBase {
  param($Graphics, [string]$Category)

  $skin = if ($Category -match 'Girls|Boys') { '#c9906d' } else { '#bd7f5a' }
  $skinBrush = New-Object Drawing.SolidBrush (Convert-HexColor $skin)
  $pantsBrush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(255, 31, 43, 59))

  $Graphics.FillRectangle($skinBrush, 365, 60, 70, 120)
  $Graphics.FillEllipse($skinBrush, 245, 130, 310, 92)
  $Graphics.FillRectangle($pantsBrush, 285, 660, 230, 230)
  $Graphics.FillEllipse($skinBrush, 210, 205, 58, 470)
  $Graphics.FillEllipse($skinBrush, 532, 205, 58, 470)
  $skinBrush.Dispose()
  $pantsBrush.Dispose()
}

function Draw-ModelGarment {
  param($Graphics, $Palette, $Seed, [string]$Style, [string]$Category)

  Draw-ModelBase -Graphics $Graphics -Category $Category

  if ($Style -match 'Dress') {
    $points = [Drawing.PointF[]]@(
      [Drawing.PointF]::new(300, 180),
      [Drawing.PointF]::new(500, 180),
      [Drawing.PointF]::new(570, 860),
      [Drawing.PointF]::new(230, 860)
    )
    $path = New-PathFromPoints $points
    Fill-ShapeWithPattern -Graphics $Graphics -Path $path -Palette $Palette -Seed $Seed
    $path.Dispose()
    return
  }

  if ($Style -match 'Bag') {
    $bag = New-Object Drawing.Drawing2D.GraphicsPath
    $bag.AddRectangle([Drawing.RectangleF]::new(335, 390, 255, 320))
    Fill-ShapeWithPattern -Graphics $Graphics -Path $bag -Palette $Palette -Seed $Seed
    $pen = New-Object Drawing.Pen (Convert-HexColor $Palette[1]), 9
    $Graphics.DrawArc($pen, 385, 290, 140, 170, 190, 160)
    $pen.Dispose()
    $bag.Dispose()
    return
  }

  $points = [Drawing.PointF[]]@(
    [Drawing.PointF]::new(250, 180),
    [Drawing.PointF]::new(320, 145),
    [Drawing.PointF]::new(480, 145),
    [Drawing.PointF]::new(550, 180),
    [Drawing.PointF]::new(585, 305),
    [Drawing.PointF]::new(525, 360),
    [Drawing.PointF]::new(515, 650),
    [Drawing.PointF]::new(285, 650),
    [Drawing.PointF]::new(275, 360),
    [Drawing.PointF]::new(215, 305)
  )
  $path = New-PathFromPoints $points
  Fill-ShapeWithPattern -Graphics $Graphics -Path $path -Palette $Palette -Seed $Seed
  $path.Dispose()
}

function Save-Image {
  param($Canvas, [string]$Path)

  $Canvas.Bitmap.Save($Path, [Drawing.Imaging.ImageFormat]::Png)
  $Canvas.Graphics.Dispose()
  $Canvas.Bitmap.Dispose()
}

$created = @()

foreach ($product in $products) {
  if ($Ids.Count -gt 0 -and $Ids -notcontains $product.id) {
    continue
  }
  $flatPath = Join-Path $outDir "$($product.id)-flat.png"
  $modelPath = Join-Path $outDir "$($product.id)-model.png"
  if (-not $Overwrite -and (Test-Path $flatPath) -and (Test-Path $modelPath)) {
    continue
  }

  $category = Get-PromptField -Prompt $product.flat -Field 'Category'
  $style = Get-PromptField -Prompt $product.flat -Field 'Style'
  $pattern = Get-PromptField -Prompt $product.flat -Field 'Color/pattern direction from Excel template'
  if (-not $style) { $style = $product.name }
  $palette = Get-ColorSet -Pattern "$pattern $style $($product.name)"
  $seed = Get-Seed -Id $product.id

  $flat = New-Canvas
  if ($style -match 'Swimwear|Scarf') {
    Draw-SwimFlat -Graphics $flat.Graphics -Palette $palette -Seed $seed -Style $style
  }
  elseif ($style -match 'Dress') {
    Draw-DressFlat -Graphics $flat.Graphics -Palette $palette -Seed $seed -IsKids:($category -match 'Girls')
  }
  elseif ($style -match 'Bag') {
    Draw-BagFlat -Graphics $flat.Graphics -Palette $palette -Seed $seed
  }
  else {
    Draw-ShirtFlat -Graphics $flat.Graphics -Palette $palette -Seed $seed -Style $style
  }
  Save-Image -Canvas $flat -Path $flatPath

  $model = New-Canvas
  Draw-ModelGarment -Graphics $model.Graphics -Palette $palette -Seed ($seed + 101) -Style $style -Category $category
  Save-Image -Canvas $model -Path $modelPath

  $created += $product.id
}

Write-Output "Created $($created.Count) product asset pairs."
if ($created.Count -gt 0) {
  Write-Output ($created -join ', ')
}
