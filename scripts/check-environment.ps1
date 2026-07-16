$ErrorActionPreference = "Continue"

function Check-Command {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,
        [Parameter(Mandatory = $true)]
        [string[]]$VersionArgs
    )

    $command = Get-Command $Name -ErrorAction SilentlyContinue
    if (-not $command) {
        [PSCustomObject]@{ Tool = $Name; Installed = $false; Version = "not found"; Path = "" }
        return
    }

    $version = try {
        (& $Name @VersionArgs 2>&1 | Select-Object -First 1).ToString()
    } catch {
        "installed; version check failed"
    }

    [PSCustomObject]@{
        Tool = $Name
        Installed = $true
        Version = $version
        Path = $command.Source
    }
}

$results = @(
    Check-Command -Name "git" -VersionArgs @("--version")
    Check-Command -Name "node" -VersionArgs @("--version")
    Check-Command -Name "npm" -VersionArgs @("--version")
    Check-Command -Name "claude" -VersionArgs @("--version")
    Check-Command -Name "codex" -VersionArgs @("--version")
)

$results | Format-Table -AutoSize

Write-Host ""
Write-Host "Read-only diagnostics:"
Write-Host "- Claude Code: claude doctor"
Write-Host "- Codex: start 'codex' and follow its authentication/configuration prompts"
Write-Host "- Never print API keys while diagnosing."

