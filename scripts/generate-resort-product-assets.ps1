param(
  [switch]$Overwrite,
  [string[]]$Ids = @()
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = Get-Location
$sourcePath = Join-Path $root 'src\data\products.ts'
$outDir = Join-Path $root 'public\product-images\resort-generated'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$source = Get-Content -Raw -Path $sourcePath
$productRegex = [regex]::new("\{\s*id:\s*'(?<id>[^']+)'\s*,\s*name:\s*'(?<name>[^']+)'\s*,\s*fabric:\s*'(?<fabric>[^']+)'\s*,\s*moq:\s*'(?<moq>[^']+)'\s*,\s*price:\s*'(?<price>[^']+)'\s*,\s*image:\s*'(?:https://images\.unsplash\.com/[^']+|/product-images/resort-generated/[^']+)'\s*\}", [Text.RegularExpressions.RegexOptions]::Singleline)

$products = foreach ($match in $productRegex.Matches($source)) {
  [pscustomobject]@{
    Id = $match.Groups['id'].Value
    Name = $match.Groups['name'].Value
    Fabric = $match.Groups['fabric'].Value
  }
}

$palettes = @(
  @('#123c46', '#f7f1df', '#e56b4f', '#8fbf7a', '#d9a441', '#1d2430'),
  @('#10233d', '#f6efe2', '#d94f45', '#2f7f6f', '#f0be63', '#6b8e72'),
  @('#f4eee1', '#203b55', '#c95f3f', '#6f9f82', '#e8bd6f', '#27272a'),
  @('#0f4f58', '#fff7e6', '#f08a5d', '#9fc37b', '#24415f', '#e7cf8f'),
  @('#252525', '#f8f1df', '#d95d39', '#75a99c', '#d9b15f', '#7c3f52'),
  @('#e9f3ef', '#183d3b', '#ef6f57', '#4d8c62', '#f1c45d', '#2b2b3f')
)

function C([string]$hex) {
  return [Drawing.ColorTranslator]::FromHtml($hex)
}

function New-Canvas {
  $bitmap = New-Object Drawing.Bitmap 800, 1000
  $graphics = [Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear((C '#fbfaf7'))
  return @{ Bitmap = $bitmap; Graphics = $graphics }
}

function PathFrom {
  param([Drawing.PointF[]]$Points)
  $path = New-Object Drawing.Drawing2D.GraphicsPath
  $path.AddPolygon($Points)
  return $path
}

function RoundedPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = New-Object Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function SeedOf([string]$id) {
  $seed = 23
  foreach ($char in $id.ToCharArray()) {
    $seed = (($seed * 33) + [int][char]$char) -band 0x7fffffff
  }
  return $seed
}

function PaletteOf($product) {
  $dressRef = DressReferenceOf $product
  if ($null -ne $dressRef) { return $dressRef.Palette }
  return $palettes[(SeedOf $product.Id) % $palettes.Count]
}

function CategoryOf($product) {
  if ($product.Id -match '^AC') { return 'accessory' }
  if ($product.Id -match '^MS') { return 'set' }
  if ($product.Id -match '^SW') { return 'swim' }
  if ($product.Id -match '^RD') { return 'dress' }
  return 'top'
}

function AudienceOf($product) {
  if ($product.Id -match 'K|^MSF' -or $product.Name -match 'Kids|Girls') { return 'kids' }
  if ($product.Id -match '^TSW|^SWW|^MSW|^RD' -and $product.Id -notmatch '^RDK') { return 'womens' }
  return 'mens'
}

function DressReferenceOf($product) {
  switch ($product.Id) {
    'RD1001' {
      return @{
        PatternFamily = 'blue-botanical'
        Shape = 'shirt-midi'
        Tie = $true
        Palette = @('#f6f1ea', '#d9e4ef', '#9fb8d5', '#6d90b8', '#3d6287', '#ffffff')
      }
    }
    'RD1003' {
      return @{
        PatternFamily = 'orange-medallion'
        Shape = 'shirt-short'
        Tie = $true
        Palette = @('#f7efe3', '#d7835f', '#ba6541', '#597d96', '#d2ad77', '#fffaf2')
      }
    }
    'RD1004' {
      return @{
        PatternFamily = 'reef-nocturne'
        Shape = 'shirt-short-structured'
        Tie = $true
        Palette = @('#241f33', '#7f70c9', '#d792b4', '#8abec6', '#f0d498', '#f7f1e6')
      }
    }
    'RD1101' {
      return @{
        PatternFamily = 'black-reef'
        Shape = 'polo-short'
        Tie = $false
        Palette = @('#151515', '#caa0db', '#efc0d0', '#a7dcd7', '#e4c08b', '#f4ead9')
      }
    }
    'RD1102' {
      return @{
        PatternFamily = 'cocoa-reef'
        Shape = 'polo-short'
        Tie = $false
        Palette = @('#5a311d', '#f0c2cf', '#b686d7', '#abd8d3', '#e7c184', '#f3e8da')
      }
    }
    'RD1103' {
      return @{
        PatternFamily = 'shell-watercolor'
        Shape = 'polo-midi'
        Tie = $true
        Palette = @('#eef1ed', '#99c9c9', '#ef9a83', '#87b6a8', '#ceb893', '#f7f4eb')
      }
    }
    'RD1401' {
      return @{
        PatternFamily = 'lemon-toile'
        Shape = 'sundress-midi'
        Tie = $false
        Palette = @('#fbf4e7', '#7ea9d7', '#5f87be', '#f0d65d', '#d8b15f', '#ffffff')
      }
    }
    'RDK7001' {
      return @{
        PatternFamily = 'blue-botanical'
        Shape = 'girls-shirt'
        Tie = $true
        Palette = @('#f6f1ea', '#d9e4ef', '#9fb8d5', '#6d90b8', '#3d6287', '#ffffff')
      }
    }
    'RDK7002' {
      return @{
        PatternFamily = 'lemon-toile'
        Shape = 'girls-shirt'
        Tie = $true
        Palette = @('#fbf4e7', '#7ea9d7', '#5f87be', '#f0d65d', '#d8b15f', '#ffffff')
      }
    }
    'RDK7101' {
      return @{
        PatternFamily = 'orange-medallion'
        Shape = 'girls-polo'
        Tie = $false
        Palette = @('#f7efe3', '#d7835f', '#ba6541', '#597d96', '#d2ad77', '#fffaf2')
      }
    }
    'RDK7102' {
      return @{
        PatternFamily = 'black-reef'
        Shape = 'girls-polo'
        Tie = $false
        Palette = @('#151515', '#caa0db', '#efc0d0', '#a7dcd7', '#e4c08b', '#f4ead9')
      }
    }
    'RDK7201' {
      return @{
        PatternFamily = 'shell-watercolor'
        Shape = 'girls-sundress'
        Tie = $true
        Palette = @('#eef1ed', '#99c9c9', '#ef9a83', '#87b6a8', '#ceb893', '#f7f4eb')
      }
    }
  }

  return $null
}

function Shadow($g, [Drawing.RectangleF]$bounds) {
  for ($i = 0; $i -lt 6; $i++) {
    $brush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(16 - $i * 2, 20, 24, 30))
    $g.FillEllipse($brush, $bounds.X - $i * 5, $bounds.Y - $i * 2, $bounds.Width + $i * 10, $bounds.Height + $i * 4)
    $brush.Dispose()
  }
}

function Hibiscus($g, [float]$x, [float]$y, [float]$size, [string]$petal, [string]$center) {
  $petalBrush = New-Object Drawing.SolidBrush (C $petal)
  $centerBrush = New-Object Drawing.SolidBrush (C $center)
  for ($i = 0; $i -lt 5; $i++) {
    $state = $g.Save()
    $g.TranslateTransform($x, $y)
    $g.RotateTransform($i * 72)
    $g.FillEllipse($petalBrush, -$size * 0.22, -$size * 0.78, $size * 0.44, $size * 0.62)
    $g.Restore($state)
  }
  $g.FillEllipse($centerBrush, $x - $size * 0.12, $y - $size * 0.12, $size * 0.24, $size * 0.24)
  $petalBrush.Dispose()
  $centerBrush.Dispose()
}

function Palm($g, [float]$x, [float]$y, [float]$len, [float]$angle, [string]$color) {
  $pen = New-Object Drawing.Pen (C $color), 3
  $brush = New-Object Drawing.SolidBrush (C $color)
  $state = $g.Save()
  $g.TranslateTransform($x, $y)
  $g.RotateTransform($angle)
  $g.DrawLine($pen, 0, 0, $len, 0)
  for ($i = 0; $i -lt 6; $i++) {
    $px = 10 + ($i * ($len - 18) / 6)
    $w = 18 + ($i % 3) * 5
    $g.FillEllipse($brush, $px, -$w / 2, $w * 1.5, $w)
    $g.FillEllipse($brush, $px, -$w / 2, $w * 1.5, -$w)
  }
  $g.Restore($state)
  $brush.Dispose()
  $pen.Dispose()
}

function WaterLeaf($g, [float]$x, [float]$y, [float]$w, [float]$h, [float]$angle, [string]$color, [int]$alpha = 135) {
  $state = $g.Save()
  $g.TranslateTransform($x, $y)
  $g.RotateTransform($angle)
  $brush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb($alpha, (C $color)))
  $g.FillEllipse($brush, -$w / 2, -$h / 2, $w, $h)
  $g.FillEllipse($brush, -$w * 0.18, -$h * 0.72, $w * 0.36, $h * 0.54)
  $g.Restore($state)
  $brush.Dispose()
}

function CoralBranch($g, [float]$x, [float]$y, [float]$height, [float]$angle, [string]$color) {
  $pen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(150, (C $color))), 4
  $state = $g.Save()
  $g.TranslateTransform($x, $y)
  $g.RotateTransform($angle)
  $g.DrawLine($pen, 0, 0, 0, -$height)
  for ($i = 0; $i -lt 5; $i++) {
    $py = -($height * (0.16 + ($i * 0.15)))
    $reach = 16 + ($i * 8)
    $rise = 18 + ($i * 4)
    $g.DrawLine($pen, 0, $py, -$reach, $py - $rise)
    $g.DrawLine($pen, 0, $py, $reach, $py - ($rise - 2))
  }
  $g.Restore($state)
  $pen.Dispose()
}

function Fish($g, [float]$x, [float]$y, [float]$size, [float]$angle, [string]$color) {
  $state = $g.Save()
  $g.TranslateTransform($x, $y)
  $g.RotateTransform($angle)
  $brush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(218, (C $color)))
  $g.FillEllipse($brush, -$size * 0.6, -$size * 0.34, $size * 1.08, $size * 0.68)
  $tail = PathFrom ([Drawing.PointF[]]@(
    [Drawing.PointF]::new($size * 0.28, 0),
    [Drawing.PointF]::new($size * 0.86, -$size * 0.34),
    [Drawing.PointF]::new($size * 0.86, $size * 0.34)
  ))
  $g.FillPath($brush, $tail)
  $tail.Dispose()
  $g.Restore($state)
  $brush.Dispose()
}

function ShellFan($g, [float]$x, [float]$y, [float]$size, [float]$angle, [string]$color) {
  $state = $g.Save()
  $g.TranslateTransform($x, $y)
  $g.RotateTransform($angle)
  $brush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(185, (C $color)))
  $pen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(135, (C $color))), 2
  $shell = PathFrom ([Drawing.PointF[]]@(
    [Drawing.PointF]::new(0, -$size * 0.9),
    [Drawing.PointF]::new($size * 0.78, -$size * 0.24),
    [Drawing.PointF]::new($size * 0.92, $size * 0.34),
    [Drawing.PointF]::new(0, $size * 0.78),
    [Drawing.PointF]::new(-$size * 0.92, $size * 0.34),
    [Drawing.PointF]::new(-$size * 0.78, -$size * 0.24)
  ))
  $g.FillPath($brush, $shell)
  for ($i = -2; $i -le 2; $i++) {
    $g.DrawLine($pen, 0, $size * 0.76, $i * $size * 0.18, -$size * 0.54)
  }
  $shell.Dispose()
  $pen.Dispose()
  $brush.Dispose()
  $g.Restore($state)
}

function LemonMotif($g, [float]$x, [float]$y, [float]$size, [float]$angle, [string]$fruit, [string]$leaf) {
  $state = $g.Save()
  $g.TranslateTransform($x, $y)
  $g.RotateTransform($angle)
  $fruitBrush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(228, (C $fruit)))
  $leafBrush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(180, (C $leaf)))
  $g.FillEllipse($fruitBrush, -$size * 0.52, -$size * 0.34, $size * 1.04, $size * 0.68)
  $g.FillEllipse($leafBrush, -$size * 0.08, -$size * 0.74, $size * 0.36, $size * 0.2)
  $g.FillEllipse($leafBrush, -$size * 0.28, -$size * 0.66, $size * 0.28, $size * 0.18)
  $leafBrush.Dispose()
  $fruitBrush.Dispose()
  $g.Restore($state)
}

function SketchVine($g, [float]$x1, [float]$y1, [float]$x2, [float]$y2, [string]$color) {
  $pen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(90, (C $color))), 3
  $g.DrawBezier($pen, $x1, $y1, $x1 + 24, $y1 - 32, $x2 - 24, $y2 + 24, $x2, $y2)
  $pen.Dispose()
}

function FillDressReferencePattern($g, $path, $dressRef, [int]$seed) {
  $bounds = $path.GetBounds()
  Shadow $g ([Drawing.RectangleF]::new($bounds.X + 18, $bounds.Bottom - 18, $bounds.Width - 36, 34))
  $base = New-Object Drawing.SolidBrush (C $dressRef.Palette[0])
  $g.FillPath($base, $path)
  $base.Dispose()

  $oldClip = $g.Clip
  $g.SetClip($path)
  $random = New-Object Random $seed

  switch ($dressRef.PatternFamily) {
    'blue-botanical' {
      for ($i = 0; $i -lt 26; $i++) {
        WaterLeaf $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float](44 + $random.NextDouble() * 94)) ([float](84 + $random.NextDouble() * 136)) ([float]($random.NextDouble() * 360)) $dressRef.Palette[2] 118
      }
      for ($i = 0; $i -lt 22; $i++) {
        WaterLeaf $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float](38 + $random.NextDouble() * 72)) ([float](74 + $random.NextDouble() * 116)) ([float]($random.NextDouble() * 360)) $dressRef.Palette[3] 105
      }
    }
    'orange-medallion' {
      for ($i = 0; $i -lt 14; $i++) {
        Hibiscus $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float](36 + $random.NextDouble() * 34)) $dressRef.Palette[1] $dressRef.Palette[4]
      }
      for ($i = 0; $i -lt 18; $i++) {
        WaterLeaf $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float](32 + $random.NextDouble() * 54)) ([float](72 + $random.NextDouble() * 76)) ([float]($random.NextDouble() * 360)) $dressRef.Palette[3] 108
      }
      $bandPen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(145, (C $dressRef.Palette[1]))), 5
      $accentPen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(110, (C $dressRef.Palette[3]))), 2
      $y = $bounds.Bottom - 66
      $g.DrawLine($bandPen, $bounds.Left - 20, $y, $bounds.Right + 20, $y)
      $g.DrawLine($accentPen, $bounds.Left - 20, $y - 12, $bounds.Right + 20, $y - 12)
      $bandPen.Dispose()
      $accentPen.Dispose()
    }
    'lemon-toile' {
      for ($i = 0; $i -lt 26; $i++) {
        $x1 = [float]($bounds.Left + $random.NextDouble() * $bounds.Width)
        $y1 = [float]($bounds.Top + $random.NextDouble() * $bounds.Height)
        $x2 = [float]($x1 + (-70 + $random.NextDouble() * 140))
        $y2 = [float]($y1 + (-90 + $random.NextDouble() * 140))
        SketchVine $g $x1 $y1 $x2 $y2 $dressRef.Palette[2]
      }
      for ($i = 0; $i -lt 18; $i++) {
        LemonMotif $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float](30 + $random.NextDouble() * 26)) ([float]($random.NextDouble() * 360)) $dressRef.Palette[3] $dressRef.Palette[2]
      }
      $hemPen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(115, (C $dressRef.Palette[2]))), 4
      $g.DrawLine($hemPen, $bounds.Left - 20, $bounds.Bottom - 44, $bounds.Right + 20, $bounds.Bottom - 44)
      $g.DrawLine($hemPen, $bounds.Left - 20, $bounds.Bottom - 24, $bounds.Right + 20, $bounds.Bottom - 24)
      $hemPen.Dispose()
    }
    'shell-watercolor' {
      for ($i = 0; $i -lt 24; $i++) {
        WaterLeaf $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float](34 + $random.NextDouble() * 54)) ([float](54 + $random.NextDouble() * 92)) ([float]($random.NextDouble() * 360)) $dressRef.Palette[1] 84
      }
      for ($i = 0; $i -lt 12; $i++) {
        ShellFan $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float](18 + $random.NextDouble() * 24)) ([float]($random.NextDouble() * 360)) $dressRef.Palette[4]
      }
      for ($i = 0; $i -lt 16; $i++) {
        CoralBranch $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + 70 + $random.NextDouble() * ($bounds.Height - 80))) ([float](46 + $random.NextDouble() * 58)) ([float](-30 + $random.NextDouble() * 60)) $dressRef.Palette[2]
      }
    }
    default {
      $reefBase = if ($dressRef.PatternFamily -eq 'cocoa-reef') { $dressRef.Palette[0] } elseif ($dressRef.PatternFamily -eq 'black-reef') { '#111111' } else { '#211b2f' }
      $fill = New-Object Drawing.SolidBrush (C $reefBase)
      $g.FillRectangle($fill, $bounds.Left - 20, $bounds.Top - 20, $bounds.Width + 40, $bounds.Height + 40)
      $fill.Dispose()
      for ($i = 0; $i -lt 18; $i++) {
        CoralBranch $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + 90 + $random.NextDouble() * ($bounds.Height - 100))) ([float](60 + $random.NextDouble() * 74)) ([float](-38 + $random.NextDouble() * 76)) $dressRef.Palette[2]
      }
      for ($i = 0; $i -lt 16; $i++) {
        CoralBranch $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + 90 + $random.NextDouble() * ($bounds.Height - 100))) ([float](48 + $random.NextDouble() * 68)) ([float](-38 + $random.NextDouble() * 76)) $dressRef.Palette[3]
      }
      for ($i = 0; $i -lt 9; $i++) {
        ShellFan $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float](18 + $random.NextDouble() * 24)) ([float]($random.NextDouble() * 360)) $dressRef.Palette[4]
      }
      for ($i = 0; $i -lt 10; $i++) {
        Fish $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float](12 + $random.NextDouble() * 14)) ([float]($random.NextDouble() * 360)) $dressRef.Palette[5]
      }
    }
  }

  $g.Clip = $oldClip
  $edge = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(54, 20, 24, 30)), 2
  $g.DrawPath($edge, $path)
  $edge.Dispose()
}

function Pattern($g, $path, [string[]]$palette, [int]$seed, [string]$scale) {
  $bounds = $path.GetBounds()
  $oldClip = $g.Clip
  $g.SetClip($path)
  $random = New-Object Random $seed
  $count = if ($scale -eq 'small') { 18 } elseif ($scale -eq 'large') { 11 } else { 15 }
  $min = if ($scale -eq 'small') { 20 } elseif ($scale -eq 'large') { 58 } else { 36 }
  $max = if ($scale -eq 'small') { 40 } elseif ($scale -eq 'large') { 96 } else { 66 }

  $stripePen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(30, (C $palette[1]))), 3
  for ($x = -260; $x -lt 980; $x += 64) {
    $g.DrawLine($stripePen, $x, 0, $x + 470, 1000)
  }
  $stripePen.Dispose()

  for ($i = 0; $i -lt $count; $i++) {
    Hibiscus $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float]($min + $random.NextDouble() * ($max - $min))) $palette[2] $palette[4]
  }
  for ($i = 0; $i -lt ($count + 5); $i++) {
    Palm $g ([float]($bounds.Left + $random.NextDouble() * $bounds.Width)) ([float]($bounds.Top + $random.NextDouble() * $bounds.Height)) ([float]($min + 28 + $random.NextDouble() * 64)) ([float]($random.NextDouble() * 360)) $palette[3]
  }
  for ($i = 0; $i -lt 18; $i++) {
    $dot = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(62, (C $palette[4])))
    $s = [float](8 + $random.NextDouble() * 18)
    $g.FillEllipse($dot, [float]($bounds.Left + $random.NextDouble() * $bounds.Width), [float]($bounds.Top + $random.NextDouble() * $bounds.Height), $s, $s)
    $dot.Dispose()
  }
  $g.Clip = $oldClip
}

function FillPattern($g, $path, [string[]]$palette, [int]$seed, [string]$scale = 'normal') {
  $b = $path.GetBounds()
  Shadow $g ([Drawing.RectangleF]::new($b.X + 18, $b.Bottom - 18, $b.Width - 36, 34))
  $base = New-Object Drawing.SolidBrush (C $palette[0])
  $g.FillPath($base, $path)
  Pattern $g $path $palette $seed $scale
  $edge = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(46, 20, 24, 30)), 2
  $g.DrawPath($edge, $path)
  $edge.Dispose()
  $base.Dispose()
}

function CutNeck($g, [float]$x, [float]$y, [float]$w, [float]$h) {
  $brush = New-Object Drawing.SolidBrush (C '#fbfaf7')
  $g.FillEllipse($brush, $x, $y, $w, $h)
  $brush.Dispose()
}

function Placket($g, [float]$x, [float]$y1, [float]$y2, [string]$color) {
  $pen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(86, (C $color))), 4
  $g.DrawLine($pen, $x, $y1, $x, $y2)
  for ($y = $y1 + 28; $y -lt $y2; $y += 48) {
    $g.DrawEllipse($pen, $x - 4, $y - 4, 8, 8)
  }
  $pen.Dispose()
}

function TopShape([float]$top, [float]$bottom, [bool]$longSleeve, [bool]$tank, [bool]$cropped) {
  if ($cropped) { $bottom -= 105 }
  if ($tank) {
    return PathFrom ([Drawing.PointF[]]@(
      [Drawing.PointF]::new(315, $top),
      [Drawing.PointF]::new(485, $top),
      [Drawing.PointF]::new(525, $bottom),
      [Drawing.PointF]::new(275, $bottom)
    ))
  }

  $sleeve = if ($longSleeve) { $bottom - 155 } else { $top + 190 }
  return PathFrom ([Drawing.PointF[]]@(
    [Drawing.PointF]::new(250, $top + 70),
    [Drawing.PointF]::new(320, $top),
    [Drawing.PointF]::new(480, $top),
    [Drawing.PointF]::new(550, $top + 70),
    [Drawing.PointF]::new(610, $sleeve),
    [Drawing.PointF]::new(548, $sleeve + 40),
    [Drawing.PointF]::new(525, $bottom),
    [Drawing.PointF]::new(275, $bottom),
    [Drawing.PointF]::new(252, $sleeve + 40),
    [Drawing.PointF]::new(190, $sleeve)
  ))
}

function DrawTop($g, $palette, [int]$seed, $product, [bool]$model = $false) {
  $name = $product.Name.ToLowerInvariant()
  $top = if ($model) { 145 } else { 180 }
  $bottom = if ($model) { 650 } else { 790 }
  $path = TopShape $top $bottom ($name.Contains('long sleeve')) ($name.Contains('tank') -or $name.Contains('racerback')) ($name.Contains('cropped'))
  $scale = if ($name.Contains('vintage') -or $name.Contains('acid')) { 'large' } else { 'normal' }
  FillPattern $g $path $palette $seed $scale
  CutNeck $g 348 ($top - 12) 104 84
  if ($name.Contains('henley')) { Placket $g 400 ($top + 55) ($top + 185) $palette[1] }
  $path.Dispose()
}

function CutVNeck($g, [float]$midX, [float]$top, [float]$width, [float]$depth) {
  $brush = New-Object Drawing.SolidBrush (C '#fbfaf7')
  $cut = PathFrom ([Drawing.PointF[]]@(
    [Drawing.PointF]::new($midX - $width / 2, $top),
    [Drawing.PointF]::new($midX + $width / 2, $top),
    [Drawing.PointF]::new($midX, $top + $depth)
  ))
  $g.FillPath($brush, $cut)
  $cut.Dispose()
  $brush.Dispose()
}

function TieBelt($g, [float]$left, [float]$right, [float]$y, [string]$color) {
  $pen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(118, (C $color))), 5
  $mid = ($left + $right) / 2
  $g.DrawLine($pen, $left, $y, $right, $y)
  $g.DrawLine($pen, $mid, $y, $mid + 46, $y + 34)
  $g.DrawLine($pen, $mid + 18, $y, $mid + 2, $y + 56)
  $pen.Dispose()
}

function DrawDress($g, $palette, [int]$seed, $product, [bool]$model = $false) {
  $name = $product.Name.ToLowerInvariant()
  $dressRef = DressReferenceOf $product
  $shape = if ($null -ne $dressRef) {
    $dressRef.Shape
  } elseif ($name.Contains('sundress')) {
    'sundress-midi'
  } elseif ($name.Contains('polo')) {
    'polo-short'
  } else {
    'shirt-midi'
  }

  $tie = $null -ne $dressRef -and $dressRef.Tie
  $neckMode = 'ellipse'
  $hasPlacket = $true
  $leftHem = 200
  $rightHem = 600
  $beltY = 0

  switch ($shape) {
    'shirt-midi' {
      $top = if ($model) { 156 } else { 172 }
      $bottom = if ($model) { 882 } else { 902 }
      $beltY = $top + 255
      $points = [Drawing.PointF[]]@(
        [Drawing.PointF]::new(248, $top + 70),
        [Drawing.PointF]::new(322, $top),
        [Drawing.PointF]::new(478, $top),
        [Drawing.PointF]::new(552, $top + 70),
        [Drawing.PointF]::new(575, $top + 250),
        [Drawing.PointF]::new(585, $bottom),
        [Drawing.PointF]::new(215, $bottom),
        [Drawing.PointF]::new(225, $top + 250)
      )
      $leftHem = 215
      $rightHem = 585
    }
    'shirt-short' {
      $top = if ($model) { 158 } else { 176 }
      $bottom = if ($model) { 768 } else { 790 }
      $beltY = $top + 205
      $points = [Drawing.PointF[]]@(
        [Drawing.PointF]::new(252, $top + 66),
        [Drawing.PointF]::new(324, $top),
        [Drawing.PointF]::new(476, $top),
        [Drawing.PointF]::new(548, $top + 66),
        [Drawing.PointF]::new(564, $top + 212),
        [Drawing.PointF]::new(552, $bottom),
        [Drawing.PointF]::new(248, $bottom),
        [Drawing.PointF]::new(236, $top + 212)
      )
      $leftHem = 248
      $rightHem = 552
    }
    'shirt-short-structured' {
      $top = if ($model) { 160 } else { 178 }
      $bottom = if ($model) { 760 } else { 780 }
      $beltY = $top + 198
      $points = [Drawing.PointF[]]@(
        [Drawing.PointF]::new(264, $top + 64),
        [Drawing.PointF]::new(332, $top),
        [Drawing.PointF]::new(468, $top),
        [Drawing.PointF]::new(536, $top + 64),
        [Drawing.PointF]::new(548, $top + 208),
        [Drawing.PointF]::new(535, $bottom),
        [Drawing.PointF]::new(265, $bottom),
        [Drawing.PointF]::new(252, $top + 208)
      )
      $leftHem = 265
      $rightHem = 535
    }
    'polo-midi' {
      $top = if ($model) { 158 } else { 176 }
      $bottom = if ($model) { 852 } else { 874 }
      $beltY = $top + 248
      $points = [Drawing.PointF[]]@(
        [Drawing.PointF]::new(270, $top + 62),
        [Drawing.PointF]::new(338, $top),
        [Drawing.PointF]::new(462, $top),
        [Drawing.PointF]::new(530, $top + 62),
        [Drawing.PointF]::new(557, $top + 230),
        [Drawing.PointF]::new(572, $bottom),
        [Drawing.PointF]::new(228, $bottom),
        [Drawing.PointF]::new(243, $top + 230)
      )
      $leftHem = 228
      $rightHem = 572
    }
    'polo-short' {
      $top = if ($model) { 160 } else { 182 }
      $bottom = if ($model) { 760 } else { 782 }
      $beltY = $top + 198
      $points = [Drawing.PointF[]]@(
        [Drawing.PointF]::new(274, $top + 60),
        [Drawing.PointF]::new(338, $top),
        [Drawing.PointF]::new(462, $top),
        [Drawing.PointF]::new(526, $top + 60),
        [Drawing.PointF]::new(554, $top + 205),
        [Drawing.PointF]::new(548, $bottom),
        [Drawing.PointF]::new(252, $bottom),
        [Drawing.PointF]::new(246, $top + 205)
      )
      $leftHem = 252
      $rightHem = 548
    }
    'sundress-midi' {
      $top = if ($model) { 190 } else { 200 }
      $bottom = if ($model) { 888 } else { 908 }
      $beltY = 0
      $neckMode = 'v'
      $hasPlacket = $false
      $points = [Drawing.PointF[]]@(
        [Drawing.PointF]::new(334, $top),
        [Drawing.PointF]::new(466, $top),
        [Drawing.PointF]::new(585, $bottom),
        [Drawing.PointF]::new(215, $bottom)
      )
      $leftHem = 215
      $rightHem = 585
    }
    'girls-shirt' {
      $top = if ($model) { 210 } else { 238 }
      $bottom = if ($model) { 772 } else { 790 }
      $beltY = $top + 170
      $points = [Drawing.PointF[]]@(
        [Drawing.PointF]::new(284, $top + 54),
        [Drawing.PointF]::new(334, $top),
        [Drawing.PointF]::new(466, $top),
        [Drawing.PointF]::new(516, $top + 54),
        [Drawing.PointF]::new(536, $top + 168),
        [Drawing.PointF]::new(548, $bottom),
        [Drawing.PointF]::new(252, $bottom),
        [Drawing.PointF]::new(264, $top + 168)
      )
      $leftHem = 252
      $rightHem = 548
    }
    'girls-polo' {
      $top = if ($model) { 214 } else { 240 }
      $bottom = if ($model) { 762 } else { 780 }
      $beltY = 0
      $points = [Drawing.PointF[]]@(
        [Drawing.PointF]::new(292, $top + 48),
        [Drawing.PointF]::new(342, $top),
        [Drawing.PointF]::new(458, $top),
        [Drawing.PointF]::new(508, $top + 48),
        [Drawing.PointF]::new(528, $top + 160),
        [Drawing.PointF]::new(538, $bottom),
        [Drawing.PointF]::new(262, $bottom),
        [Drawing.PointF]::new(272, $top + 160)
      )
      $leftHem = 262
      $rightHem = 538
    }
    'girls-sundress' {
      $top = if ($model) { 218 } else { 242 }
      $bottom = if ($model) { 774 } else { 792 }
      $beltY = $top + 170
      $neckMode = 'v'
      $hasPlacket = $false
      $points = [Drawing.PointF[]]@(
        [Drawing.PointF]::new(342, $top),
        [Drawing.PointF]::new(458, $top),
        [Drawing.PointF]::new(545, $bottom),
        [Drawing.PointF]::new(255, $bottom)
      )
      $leftHem = 255
      $rightHem = 545
    }
  }

  $path = PathFrom $points
  if ($null -ne $dressRef) {
    FillDressReferencePattern $g $path $dressRef $seed
  }
  else {
    FillPattern $g $path $palette $seed 'large'
  }

  if ($neckMode -eq 'v') {
    CutVNeck $g 400 ($top - 2) 112 100
    $strapPen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(102, (C $palette[4]))), 6
    $g.DrawLine($strapPen, 350, $top + 6, 330, $top - 28)
    $g.DrawLine($strapPen, 450, $top + 6, 470, $top - 28)
    $strapPen.Dispose()
  }
  else {
    CutNeck $g 350 ($top - 12) 100 80
    if ($hasPlacket) {
      $placketEnd = if ($shape -like 'shirt-*' -or $shape -eq 'girls-shirt') { $bottom - 40 } else { $top + 205 }
      Placket $g 400 ($top + 56) $placketEnd $palette[5]
      $collarPen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(90, (C $palette[5]))), 3
      $g.DrawLine($collarPen, 400, $top + 26, 356, $top + 82)
      $g.DrawLine($collarPen, 400, $top + 26, 444, $top + 82)
      $collarPen.Dispose()
    }
  }

  if ($tie -and $beltY -gt 0) {
    TieBelt $g ($leftHem + 55) ($rightHem - 55) $beltY $palette[5]
  }

  $path.Dispose()
}

function DrawShorts($g, $palette, [int]$seed, [float]$x, [float]$y, [float]$w, [float]$h) {
  $path = PathFrom ([Drawing.PointF[]]@(
    [Drawing.PointF]::new($x, $y),
    [Drawing.PointF]::new($x + $w, $y),
    [Drawing.PointF]::new($x + $w - 18, $y + $h),
    [Drawing.PointF]::new($x + ($w / 2) + 18, $y + $h),
    [Drawing.PointF]::new($x + ($w / 2), $y + $h - 86),
    [Drawing.PointF]::new($x + ($w / 2) - 18, $y + $h),
    [Drawing.PointF]::new($x + 18, $y + $h)
  ))
  FillPattern $g $path $palette $seed 'normal'
  $waist = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(100, (C $palette[1]))), 7
  $g.DrawLine($waist, $x + 8, $y + 35, $x + $w - 8, $y + 35)
  $waist.Dispose()
  $path.Dispose()
}

function DrawSwim($g, $palette, [int]$seed, $product, [bool]$model = $false) {
  $name = $product.Name.ToLowerInvariant()
  if ($name.Contains('board') -or $name.Contains('trunks')) {
    if ($model) { DrawShorts $g $palette $seed 285 560 230 260 } else { DrawShorts $g $palette $seed 240 270 320 390 }
    return
  }
  if ($name.Contains('rash')) {
    $rashTop = if ($model) { 145 } else { 170 }
    $rashBottom = if ($model) { 650 } else { 760 }
    $neckY = if ($model) { 133 } else { 158 }
    $path = TopShape $rashTop $rashBottom $true $false $false
    FillPattern $g $path $palette $seed 'small'
    CutNeck $g 348 $neckY 104 84
    $path.Dispose()
    return
  }
  if ($name.Contains('bikini')) {
    $top = PathFrom ([Drawing.PointF[]]@(
      [Drawing.PointF]::new(285, 260),
      [Drawing.PointF]::new(390, 330),
      [Drawing.PointF]::new(515, 260),
      [Drawing.PointF]::new(485, 420),
      [Drawing.PointF]::new(315, 420)
    ))
    FillPattern $g $top $palette $seed 'small'
    $top.Dispose()
    if ($model) { DrawShorts $g $palette ($seed + 17) 315 570 170 180 } else { DrawShorts $g $palette ($seed + 17) 285 585 230 205 }
    return
  }
  if ($name.Contains('sarong')) {
    $path = PathFrom ([Drawing.PointF[]]@(
      [Drawing.PointF]::new(250, 255),
      [Drawing.PointF]::new(550, 265),
      [Drawing.PointF]::new(605, 825),
      [Drawing.PointF]::new(260, 850),
      [Drawing.PointF]::new(200, 520)
    ))
    FillPattern $g $path $palette $seed 'large'
    $path.Dispose()
    return
  }
  if ($name.Contains('swim set')) {
    $path = TopShape 155 470 $true $false $false
    FillPattern $g $path $palette $seed 'small'
    CutNeck $g 348 143 104 84
    $path.Dispose()
    DrawShorts $g $palette ($seed + 29) 265 560 270 260
    return
  }

  $path = PathFrom ([Drawing.PointF[]]@(
    [Drawing.PointF]::new(315, 215),
    [Drawing.PointF]::new(485, 215),
    [Drawing.PointF]::new(540, 590),
    [Drawing.PointF]::new(485, 815),
    [Drawing.PointF]::new(400, 765),
    [Drawing.PointF]::new(315, 815),
    [Drawing.PointF]::new(260, 590)
  ))
  FillPattern $g $path $palette $seed 'small'
  CutNeck $g 350 178 100 90
  $path.Dispose()
}

function MiniTop($g, $palette, [int]$seed, [float]$x, [float]$y, [float]$w, [float]$h) {
  $path = PathFrom ([Drawing.PointF[]]@(
    [Drawing.PointF]::new($x + 40, $y + 60),
    [Drawing.PointF]::new($x + 102, $y),
    [Drawing.PointF]::new($x + $w - 102, $y),
    [Drawing.PointF]::new($x + $w - 40, $y + 60),
    [Drawing.PointF]::new($x + $w, $y + 178),
    [Drawing.PointF]::new($x + $w - 52, $y + 212),
    [Drawing.PointF]::new($x + $w - 72, $y + $h),
    [Drawing.PointF]::new($x + 72, $y + $h),
    [Drawing.PointF]::new($x + 52, $y + 212),
    [Drawing.PointF]::new($x, $y + 178)
  ))
  FillPattern $g $path $palette $seed 'small'
  CutNeck $g ($x + $w / 2 - 45) ($y - 10) 90 68
  $path.Dispose()
}

function MiniDress($g, $palette, [int]$seed, [float]$x, [float]$y, [float]$w, [float]$h) {
  $path = PathFrom ([Drawing.PointF[]]@(
    [Drawing.PointF]::new($x + 70, $y),
    [Drawing.PointF]::new($x + $w - 70, $y),
    [Drawing.PointF]::new($x + $w, $y + $h),
    [Drawing.PointF]::new($x, $y + $h)
  ))
  FillPattern $g $path $palette $seed 'small'
  $path.Dispose()
}

function DrawSet($g, $palette, [int]$seed, $product, [bool]$model = $false) {
  $name = $product.Name.ToLowerInvariant()
  if ($model) {
    DrawTop $g $palette $seed $product $true
    if ($name.Contains('skirt')) {
      $skirt = PathFrom ([Drawing.PointF[]]@(
        [Drawing.PointF]::new(300, 640),
        [Drawing.PointF]::new(500, 640),
        [Drawing.PointF]::new(560, 900),
        [Drawing.PointF]::new(240, 900)
      ))
      FillPattern $g $skirt $palette ($seed + 41) 'normal'
      $skirt.Dispose()
    }
    else {
      DrawShorts $g $palette ($seed + 29) 298 650 204 190
    }
    if ($name.Contains('family')) {
      MiniDress $g $palette ($seed + 19) 90 330 175 320
      MiniTop $g $palette ($seed + 33) 540 330 165 255
    }
    return
  }

  if ($name.Contains('family')) {
    MiniTop $g $palette $seed 235 110 330 345
    MiniDress $g $palette ($seed + 11) 132 520 240 330
    MiniTop $g $palette ($seed + 23) 435 525 225 300
    return
  }
  if ($name.Contains('skirt')) {
    MiniTop $g $palette $seed 235 145 330 320
    $skirt = PathFrom ([Drawing.PointF[]]@(
      [Drawing.PointF]::new(300, 555),
      [Drawing.PointF]::new(500, 555),
      [Drawing.PointF]::new(575, 825),
      [Drawing.PointF]::new(225, 825)
    ))
    FillPattern $g $skirt $palette ($seed + 41) 'normal'
    $skirt.Dispose()
    return
  }
  MiniTop $g $palette $seed 230 125 340 340
  DrawShorts $g $palette ($seed + 31) 260 570 280 265
}

function DrawAccessory($g, $palette, [int]$seed, $product, [bool]$model = $false) {
  $name = $product.Name.ToLowerInvariant()
  if ($model) {
    if ($name.Contains('tote')) {
      $bag = RoundedPath 360 395 230 305 16
      FillPattern $g $bag $palette $seed 'normal'
      $pen = New-Object Drawing.Pen (C $palette[1]), 8
      $g.DrawArc($pen, 410, 300, 105, 140, 195, 150)
      $pen.Dispose()
      $bag.Dispose()
      return
    }
    if ($name.Contains('cap') -or $name.Contains('hat')) {
      $crown = RoundedPath 285 86 230 120 48
      FillPattern $g $crown $palette $seed 'small'
      $brim = RoundedPath 235 180 330 62 31
      FillPattern $g $brim $palette ($seed + 12) 'small'
      $crown.Dispose()
      $brim.Dispose()
      return
    }
    if ($name.Contains('scrunchie')) {
      for ($i = 0; $i -lt 10; $i++) {
        $state = $g.Save()
        $g.TranslateTransform(545, 570)
        $g.RotateTransform($i * 36)
        $piece = RoundedPath -34 -92 68 82 30
        FillPattern $g $piece $palette ($seed + $i) 'small'
        $piece.Dispose()
        $g.Restore($state)
      }
      return
    }
    $cloth = if ($name.Contains('scarf')) {
      PathFrom ([Drawing.PointF[]]@(
        [Drawing.PointF]::new(315, 180),
        [Drawing.PointF]::new(445, 190),
        [Drawing.PointF]::new(510, 760),
        [Drawing.PointF]::new(380, 785)
      ))
    }
    else {
      PathFrom ([Drawing.PointF[]]@(
        [Drawing.PointF]::new(270, 415),
        [Drawing.PointF]::new(535, 375),
        [Drawing.PointF]::new(565, 565),
        [Drawing.PointF]::new(300, 605)
      ))
    }
    FillPattern $g $cloth $palette $seed 'normal'
    $cloth.Dispose()
    return
  }

  if ($name.Contains('tote')) {
    $bag = RoundedPath 215 295 370 430 18
    FillPattern $g $bag $palette $seed 'large'
    $pen = New-Object Drawing.Pen (C $palette[1]), 13
    $g.DrawArc($pen, 300, 170, 200, 235, 195, 150)
    $pen.Dispose()
    $bag.Dispose()
    return
  }
  if ($name.Contains('cap')) {
    $crown = RoundedPath 220 350 360 210 92
    FillPattern $g $crown $palette $seed 'small'
    $brim = PathFrom ([Drawing.PointF[]]@(
      [Drawing.PointF]::new(372, 515),
      [Drawing.PointF]::new(660, 560),
      [Drawing.PointF]::new(535, 640),
      [Drawing.PointF]::new(360, 585)
    ))
    FillPattern $g $brim $palette ($seed + 19) 'small'
    $crown.Dispose()
    $brim.Dispose()
    return
  }
  if ($name.Contains('hat')) {
    $crown = RoundedPath 260 315 280 230 54
    FillPattern $g $crown $palette $seed 'small'
    $brim = RoundedPath 170 500 460 118 54
    FillPattern $g $brim $palette ($seed + 9) 'small'
    $crown.Dispose()
    $brim.Dispose()
    return
  }
  if ($name.Contains('scrunchie')) {
    for ($i = 0; $i -lt 15; $i++) {
      $state = $g.Save()
      $g.TranslateTransform(400, 510)
      $g.RotateTransform($i * 24)
      $piece = RoundedPath -55 -185 110 145 46
      FillPattern $g $piece $palette ($seed + $i) 'small'
      $piece.Dispose()
      $g.Restore($state)
    }
    $inner = New-Object Drawing.SolidBrush (C '#fbfaf7')
    $g.FillEllipse($inner, 315, 425, 170, 170)
    $inner.Dispose()
    return
  }

  $rect = if ($name.Contains('scarf')) {
    PathFrom ([Drawing.PointF[]]@(
      [Drawing.PointF]::new(305, 140),
      [Drawing.PointF]::new(515, 170),
      [Drawing.PointF]::new(485, 860),
      [Drawing.PointF]::new(285, 830)
    ))
  }
  else {
    PathFrom ([Drawing.PointF[]]@(
      [Drawing.PointF]::new(205, 245),
      [Drawing.PointF]::new(595, 245),
      [Drawing.PointF]::new(595, 635),
      [Drawing.PointF]::new(205, 635)
    ))
  }
  FillPattern $g $rect $palette $seed 'large'
  $rect.Dispose()
}

function DrawFlat($g, $palette, [int]$seed, $product) {
  switch (CategoryOf $product) {
    'dress' { DrawDress $g $palette $seed $product $false }
    'swim' { DrawSwim $g $palette $seed $product $false }
    'set' { DrawSet $g $palette $seed $product $false }
    'accessory' { DrawAccessory $g $palette $seed $product $false }
    default { DrawTop $g $palette $seed $product $false }
  }
}

function Body($g, [string]$audience) {
  $skin = if ($audience -eq 'kids') { '#c98f6b' } elseif ($audience -eq 'womens') { '#b97958' } else { '#bd805d' }
  $skinBrush = New-Object Drawing.SolidBrush (C $skin)
  $bottomBrush = New-Object Drawing.SolidBrush (C '#202936')
  $scale = if ($audience -eq 'kids') { 0.82 } else { 1.0 }
  $x = if ($audience -eq 'kids') { 70 } else { 0 }

  $g.FillRectangle($skinBrush, 368 + $x / 2, 62, 64 * $scale, 130 * $scale)
  $g.FillEllipse($skinBrush, 245 + $x, 142, 310 * $scale, 78 * $scale)
  $g.FillEllipse($skinBrush, 214 + $x, 210, 54 * $scale, 455 * $scale)
  $g.FillEllipse($skinBrush, 532 + $x, 210, 54 * $scale, 455 * $scale)
  $g.FillRectangle($bottomBrush, 290 + $x, 665, 220 * $scale, 235)

  $skinBrush.Dispose()
  $bottomBrush.Dispose()
}

function DrawModel($g, $palette, [int]$seed, $product) {
  Body $g (AudienceOf $product)
  switch (CategoryOf $product) {
    'dress' { DrawDress $g $palette $seed $product $true }
    'swim' { DrawSwim $g $palette $seed $product $true }
    'set' { DrawSet $g $palette $seed $product $true }
    'accessory' { DrawAccessory $g $palette $seed $product $true }
    default { DrawTop $g $palette $seed $product $true }
  }
}

function SaveCanvas($canvas, [string]$path) {
  $canvas.Bitmap.Save($path, [Drawing.Imaging.ImageFormat]::Png)
  $canvas.Graphics.Dispose()
  $canvas.Bitmap.Dispose()
}

$created = @()

foreach ($product in $products) {
  if ($Ids.Count -gt 0 -and $Ids -notcontains $product.Id) { continue }

  $flatPath = Join-Path $outDir "$($product.Id)-flat.png"
  $modelPath = Join-Path $outDir "$($product.Id)-model.png"
  if (-not $Overwrite -and (Test-Path $flatPath) -and (Test-Path $modelPath)) { continue }

  $seed = SeedOf $product.Id
  $palette = PaletteOf $product

  $flat = New-Canvas
  DrawFlat $flat.Graphics $palette $seed $product
  SaveCanvas $flat $flatPath

  $model = New-Canvas
  DrawModel $model.Graphics $palette ($seed + 101) $product
  SaveCanvas $model $modelPath

  $created += $product.Id
}

Write-Output "Created $($created.Count) product asset pairs."
if ($created.Count -gt 0) {
  Write-Output ($created -join ', ')
}
