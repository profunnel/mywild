$states = @(
    @{ Name="Maine"; Slug="maine"; Color="#2C5F2D" },
    @{ Name="New Hampshire"; Slug="new-hampshire"; Color="#97BC62" },
    @{ Name="Vermont"; Slug="vermont"; Color="#006400" },
    @{ Name="Massachusetts"; Slug="massachusetts"; Color="#0047AB" },
    @{ Name="Connecticut"; Slug="connecticut"; Color="#8B4513" },
    @{ Name="Rhode Island"; Slug="rhode-island"; Color="#4682B4" },
    @{ Name="New England"; Slug="default"; Color="#708090" }
)

$dir = "client/public/images"
if (!(Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir }

foreach ($state in $states) {
    $svgContent = @"
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:$($state.Color);stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <text x="50%" y="50%" font-family="sans-serif" font-weight="bold" font-size="80" fill="white" text-anchor="middle" dominant-baseline="middle">$($state.Name)</text>
  <text x="50%" y="58%" font-family="sans-serif" font-size="40" fill="rgba(255,255,255,0.7)" text-anchor="middle" dominant-baseline="middle">Hero Background Placeholder</text>
</svg>
"@
    $path = "$dir/hero-$($state.Slug).svg"
    Set-Content -Path $path -Value $svgContent
    Write-Host "Created $path"
}
