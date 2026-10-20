# Publica la página en Firebase Hosting (proyecto yuwe-ai)
Set-Location $PSScriptRoot
Write-Host "Desplegando English Grammar Studio en Firebase (yuwe-ai)..." -ForegroundColor Cyan
firebase deploy --only hosting
if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Listo. Abre: https://yuwe-ai.web.app" -ForegroundColor Green
}
