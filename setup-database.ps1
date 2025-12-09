# Quick MongoDB Setup Script for DFW Furniture

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "   DFW Furniture - Database Setup" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

Write-Host "MongoDB is required for admin login to work.`n" -ForegroundColor Yellow

Write-Host "Choose your setup option:`n" -ForegroundColor White

Write-Host "1. Install MongoDB Locally (Recommended for offline development)" -ForegroundColor Green
Write-Host "   - Download: https://www.mongodb.com/try/download/community" -ForegroundColor Gray
Write-Host "   - 2 GB download, 15-20 min setup" -ForegroundColor Gray
Write-Host "   - Works offline`n" -ForegroundColor Gray

Write-Host "2. Use MongoDB Atlas (FREE Cloud) (Recommended for production)" -ForegroundColor Green
Write-Host "   - Sign up: https://www.mongodb.com/cloud/atlas/register" -ForegroundColor Gray
Write-Host "   - No installation needed" -ForegroundColor Gray
Write-Host "   - 5-10 min setup" -ForegroundColor Gray
Write-Host "   - Requires internet`n" -ForegroundColor Gray

Write-Host "3. Open detailed setup guide (ADMIN_CREDENTIALS_FIX.md)" -ForegroundColor Green
Write-Host "   - Step-by-step instructions for both options`n" -ForegroundColor Gray

$choice = Read-Host "Enter your choice (1, 2, or 3)"

switch ($choice) {
    "1" {
        Write-Host "`nOpening MongoDB download page..." -ForegroundColor Cyan
        Start-Process "https://www.mongodb.com/try/download/community"
        
        Write-Host "`nAfter installation:" -ForegroundColor Yellow
        Write-Host "1. Verify service is running: Get-Service -Name MongoDB" -ForegroundColor White
        Write-Host "2. Restart dev server: npm run dev" -ForegroundColor White
        Write-Host "3. Login at: http://localhost:3000/admin/login" -ForegroundColor White
    }
    "2" {
        Write-Host "`nOpening MongoDB Atlas signup page..." -ForegroundColor Cyan
        Start-Process "https://www.mongodb.com/cloud/atlas/register"
        
        Write-Host "`nAfter creating your FREE cluster:" -ForegroundColor Yellow
        Write-Host "1. Copy your connection string" -ForegroundColor White
        Write-Host "2. Update MONGODB_URI in .env.local" -ForegroundColor White
        Write-Host "3. Restart dev server: npm run dev" -ForegroundColor White
        Write-Host "4. Login at: http://localhost:3000/admin/login" -ForegroundColor White
    }
    "3" {
        Write-Host "`nOpening setup guide..." -ForegroundColor Cyan
        
        if (Test-Path ".\ADMIN_CREDENTIALS_FIX.md") {
            code ".\ADMIN_CREDENTIALS_FIX.md"
        } else {
            Write-Host "Guide not found. Please see FREE_SETUP_GUIDE.md" -ForegroundColor Red
        }
    }
    default {
        Write-Host "`nInvalid choice. Please run the script again." -ForegroundColor Red
    }
}

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "Admin Login Credentials:" -ForegroundColor Cyan
Write-Host "Email: admin@dfwfurniture.com" -ForegroundColor White
Write-Host "Password: DFWAdmin123!" -ForegroundColor White
Write-Host "============================================`n" -ForegroundColor Cyan
