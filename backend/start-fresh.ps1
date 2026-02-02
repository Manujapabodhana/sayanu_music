# Kill process on port 4000 and start backend

Write-Host "`n🔍 Checking port 4000..." -ForegroundColor Cyan

$processes = Get-NetTCPConnection -LocalPort 4000 -State Listen -ErrorAction SilentlyContinue | 
             Select-Object -ExpandProperty OwningProcess -Unique

if ($processes) {
    Write-Host "⚠️  Port 4000 is in use by process(es): $($processes -join ', ')" -ForegroundColor Yellow
    foreach ($proc in $processes) {
        Write-Host "   Stopping process $proc..." -ForegroundColor Yellow
        Stop-Process -Id $proc -Force -ErrorAction SilentlyContinue
    }
    Write-Host "✅ Port 4000 freed`n" -ForegroundColor Green
    Start-Sleep -Seconds 1
} else {
    Write-Host "✅ Port 4000 is available`n" -ForegroundColor Green
}

Write-Host "🚀 Starting backend server...`n" -ForegroundColor Cyan
npm start
