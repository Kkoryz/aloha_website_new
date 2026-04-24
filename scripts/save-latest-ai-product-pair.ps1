param(
  [Parameter(Mandatory = $true)]
  [string]$Id
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$latest = Get-ChildItem -Recurse -File "C:\Users\Korey Z\.codex\generated_images" |
  Where-Object { $_.Extension -in '.png', '.jpg', '.jpeg', '.webp' } |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if (-not $latest) {
  throw 'No generated image found.'
}

$outDir = Join-Path $root 'public\product-images\resort-generated'
$flatOut = Join-Path $outDir "$Id-flat.png"
$modelOut = Join-Path $outDir "$Id-model.png"

& powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'split-ai-product-pair.ps1') `
  -Source $latest.FullName `
  -FlatOut $flatOut `
  -ModelOut $modelOut

Write-Output $latest.FullName
