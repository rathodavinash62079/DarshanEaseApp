Param(
  [string]$DbPath = "C:\data\db",
  [string]$BindIp = "127.0.0.1",
  [int]$Port = 27017
)

if (-not (Test-Path $DbPath)) {
  New-Item -ItemType Directory -Path $DbPath | Out-Null
}

$serverRoot = "C:\Program Files\MongoDB\Server"
if (-not (Test-Path $serverRoot)) {
  $serverRoot = "C:\Progra~1\MongoDB\Server"
}

$mongod = Get-ChildItem -Path $serverRoot -Directory -ErrorAction SilentlyContinue |
  Sort-Object Name -Descending |
  ForEach-Object { Join-Path $_.FullName "bin\mongod.exe" } |
  Where-Object { Test-Path $_ } |
  Select-Object -First 1

if (-not $mongod) {
  Write-Error "mongod.exe not found. Please install MongoDB Community Server."
  exit 1
}

Write-Host "Starting MongoDB:"
Write-Host "  Binary: $mongod"
Write-Host "  DBPath: $DbPath"
Write-Host "  BindIp: $BindIp"
Write-Host "  Port  : $Port"

& $mongod --dbpath $DbPath --bind_ip $BindIp --port $Port
