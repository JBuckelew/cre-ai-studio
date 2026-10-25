# Step 1: install the tools once (Windows 10/11).
# Run from this folder:  powershell -ExecutionPolicy Bypass -File .\setup.ps1
# Safe to re-run: it only installs what's missing.

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

function Refresh-Path {
    $env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")
}

function Have($cmd) { [bool](Get-Command $cmd -ErrorAction SilentlyContinue) }

function Ensure($cmd, $wingetId, $label) {
    if (Have $cmd) { Write-Host "  ok   $label" -ForegroundColor Green; return }
    Write-Host "  get  $label ($wingetId)" -ForegroundColor Yellow
    winget install --id $wingetId -e --silent --accept-source-agreements --accept-package-agreements | Out-Host
    Refresh-Path
    if (-not (Have $cmd)) { throw "$label installed but '$cmd' isn't on PATH yet. Close this window, open a new PowerShell, and re-run setup.ps1." }
}

Write-Host "`nVideo-edit kit setup" -ForegroundColor Cyan
if (-not (Have "winget")) { throw "winget not found. Install 'App Installer' from the Microsoft Store, then re-run." }

Write-Host "`n[1/5] Tools"
Ensure "git"    "Git.Git"             "Git for Windows (Claude Code uses its bash)"
Ensure "ffmpeg" "Gyan.FFmpeg"         "FFmpeg"
Ensure "node"   "OpenJS.NodeJS.LTS"   "Node.js LTS"

# Prefer the py launcher: plain 'python' is often the Microsoft Store stub.
$py = $null
if (Have "py") {
    foreach ($v in "3.12", "3.11") {
        & py "-$v" -c "import sys" 2>$null
        if ($LASTEXITCODE -eq 0) { $py = @("py", "-$v"); break }
    }
}
if (-not $py) {
    Write-Host "  get  Python 3.12 (Python.Python.3.12)" -ForegroundColor Yellow
    winget install --id Python.Python.3.12 -e --silent --accept-source-agreements --accept-package-agreements | Out-Host
    Refresh-Path
    $py = @("py", "-3.12")
}
Write-Host "  ok   Python ($($py -join ' '))" -ForegroundColor Green

if (-not (Have "claude")) {
    Write-Host "  get  Claude Code" -ForegroundColor Yellow
    Invoke-RestMethod https://claude.ai/install.ps1 | Invoke-Expression
    Refresh-Path
}
Write-Host "  ok   Claude Code" -ForegroundColor Green

Write-Host "`n[2/5] Python packages (.venv)"
if (-not (Test-Path ".venv\Scripts\python.exe")) {
    & $py[0] $py[1] -m venv .venv
}
& .venv\Scripts\python.exe -m pip install --upgrade pip --quiet
& .venv\Scripts\python.exe -m pip install -r requirements.txt --quiet
if ($LASTEXITCODE -ne 0) { throw "pip install failed" }

Write-Host "`n[3/5] Graphics renderer (puppeteer + its own Chrome)"
npm install --no-audit --no-fund --loglevel=error
if ($LASTEXITCODE -ne 0) { throw "npm install failed" }

Write-Host "`n[4/5] Settings"
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "  made .env (add ELEVENLABS_API_KEY there if you want AI music)"
} else { Write-Host "  .env already exists, left as is" }

Write-Host "`n[5/5] Downloading the Whisper model (one time)"
& .venv\Scripts\python.exe -c "import os; from dotenv import load_dotenv; load_dotenv('.env'); from faster_whisper import WhisperModel; m=os.getenv('WHISPER_MODEL','small.en'); WhisperModel(m, device='cpu', compute_type='int8'); print('  ok   whisper', m)"

Write-Host "`nCheck" -ForegroundColor Cyan
$checks = @(
    @("ffmpeg",          { ffmpeg -hide_banner -version 2>$null | Select-Object -First 1 }),
    @("node",            { node --version }),
    @("python packages", { & .venv\Scripts\python.exe -c "import faster_whisper, cv2, PIL; print('cv2', cv2.__version__)" }),
    @("puppeteer",       { node -e "import('puppeteer').then(p => console.log('ok'))" }),
    @("claude",          { claude --version })
)
$bad = 0
foreach ($c in $checks) {
    try {
        $out = & $c[1] 2>$null
        if ($LASTEXITCODE -ne 0 -or -not $out) { throw "fail" }
        Write-Host ("  [x] {0,-16} {1}" -f $c[0], ($out | Select-Object -First 1)) -ForegroundColor Green
    } catch {
        Write-Host ("  [ ] {0}" -f $c[0]) -ForegroundColor Red
        $bad++
    }
}
if ($bad) { Write-Host "`n$bad check(s) failed. Open a new PowerShell and re-run setup.ps1." -ForegroundColor Red; exit 1 }

Write-Host "`nReady. Next:" -ForegroundColor Cyan
Write-Host "  1. Drop 2-3 videos whose look you like into references\ (and your best edit as best.mp4)"
Write-Host "  2. cd $PSScriptRoot ; claude"
Write-Host "  3. Type: Set up my video-edit style from the references."
Write-Host "  4. Then: Use the video-edit skill on my new take."
