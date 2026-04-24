param(
  [Parameter(Mandatory = $true)]
  [string]$Id,
  [Parameter(Mandatory = $true)]
  [string]$OutDir
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$generatedRoot = Join-Path $env:USERPROFILE '.codex\generated_images'

$latest = Get-ChildItem -Recurse -File $generatedRoot |
  Where-Object { $_.Extension -in '.png', '.jpg', '.jpeg', '.webp' } |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if (-not $latest) {
  throw 'No generated image found.'
}

$flatOut = Join-Path (Join-Path $root $OutDir) "$Id-flat.png"
$modelOut = Join-Path (Join-Path $root $OutDir) "$Id-model.png"

& powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'split-ai-product-pair.ps1') `
  -Source $latest.FullName `
  -FlatOut $flatOut `
  -ModelOut $modelOut

Write-Output $latest.FullName
