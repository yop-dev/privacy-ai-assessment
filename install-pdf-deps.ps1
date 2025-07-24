# Install PDF generation dependencies
Write-Host "Installing PDF generation dependencies..." -ForegroundColor Green
npm install jspdf@2.5.1 html2canvas@1.4.1
Write-Host "Dependencies installed successfully!" -ForegroundColor Green
Write-Host "You can now use the PDF report generation feature." -ForegroundColor Yellow