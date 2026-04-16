# Quick Copy Script - Run from Portfolio\dossera-website directory

# Copy all essential source files from monorepo to DOSSERA
Write-Host "Copying DOSSERA source files..." -ForegroundColor Green

# Copy DOSSERA page
Copy-Item -Path "..\miriniouizakariaofficiel\src\pages\Dossera\index.tsx" -Destination "src\pages\Home\DosseraPage.tsx" -Force
Write-Host "✓ Copied Dossera page"

# Copy full CSS
Copy-Item -Path "..\miriniouizakariaofficiel\src\index.css" -Destination "src\index.css" -Force
Write-Host "✓ Copied CSS"

# Copy layout files
Copy-Item -Path "..\miriniouizakariaofficiel\src\layouts\Website\Header\index.tsx" -Destination "src\layouts\Website\Header\index.tsx" -Force
Copy-Item -Path "..\miriniouizakariaofficiel\src\layouts\Website\Footer\index.tsx" -Destination "src\layouts\Website\Footer\index.tsx" -Force
Copy-Item -Path "..\miriniouizakariaofficiel\src\layouts\Website\index.tsx" -Destination "src\layouts\Website\index.tsx" -Force
Write-Host "✓ Copied layout files"

# Copy public assets
Copy-Item -Path "..\miriniouizakariaofficiel\public\*" -Destination "public\" -Force -Recurse
Write-Host "✓ Copied public assets"

Write-Host "Done! Next steps:" -ForegroundColor Green
Write-Host "1. Create index.html in project root"
Write-Host "2. Create .env.local with secrets"
Write-Host "3. Run: npm install"
Write-Host "4. Run: npm run dev"
