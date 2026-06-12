#!/bin/bash
# 鄉育官網一鍵發佈：雙擊後自動打包本機修改並上傳 GitHub，
# GitHub Actions 會接手建置與部署（約 1～2 分鐘後上線）。
set -u
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

# 內建專案位置，按鈕本身放哪裡（桌面、Dock…）都能用；
# 若按鈕仍在專案資料夾內，則以按鈕所在位置為準（專案整個搬家也不用改）。
PROJECT_DIR="/Users/cai_yijin/Downloads/education-foundation-website"
SCRIPT_DIR="$(cd "$(dirname "$0")" 2>/dev/null && pwd)"
if [ -d "$SCRIPT_DIR/.git" ] && [ -d "$SCRIPT_DIR/web" ]; then
  PROJECT_DIR="$SCRIPT_DIR"
fi
cd "$PROJECT_DIR" || {
  echo "✗ 找不到專案資料夾：$PROJECT_DIR"
  echo "  （如果專案搬家了，開 Claude Code 說「更新發佈按鈕的專案路徑」）"
  read -r -p "按 Enter 關閉視窗…"; exit 1
}

echo "🌱 鄉育官網發佈程序"
echo "────────────────────────────"

# 1) 打包本機修改（根目錄 .gitignore 白名單會自動擋下敏感文件）
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -q -m "發佈：$(date '+%Y-%m-%d %H:%M') 本機修改"
  echo "✓ 已打包本機修改"
else
  echo "・本機沒有新修改，將確認雲端狀態後結束"
fi

# 2) 同步雲端最新版（有衝突就原地停下，不動任何檔案）
git fetch origin -q
if ! git merge --no-edit -q origin/main 2>/dev/null; then
  git merge --abort 2>/dev/null
  echo "✗ 本機與雲端的修改有衝突。先不要動，開 Claude Code 說「幫我處理發佈衝突」即可。"
  read -r -p "按 Enter 關閉視窗…"; exit 1
fi

# 3) 上傳 GitHub
if git push -q origin main 2>/dev/null; then
  echo "✓ 已上傳 GitHub，自動部署啟動"
else
  echo "✗ 上傳失敗（多半是網路問題），請稍後再試一次，或找 Claude 檢查。"
  read -r -p "按 Enter 關閉視窗…"; exit 1
fi

# 4) 等待部署結果（建置失敗時網站會維持原版本，不會壞站）
echo "⏳ 等待網站建置（約 1～2 分鐘）…"
sleep 8
if command -v gh >/dev/null 2>&1; then
  RUN_ID=$(gh run list --workflow deploy.yml --limit 1 --json databaseId --jq '.[0].databaseId' 2>/dev/null)
  if [ -n "${RUN_ID:-}" ] && gh run watch "$RUN_ID" --exit-status >/dev/null 2>&1; then
    echo "✅ 部署成功！網站已更新"
  else
    echo "⚠️ 這次建置沒有成功，網站維持原本版本。開 Claude Code 說「檢查部署失敗原因」即可。"
    read -r -p "按 Enter 關閉視窗…"; exit 1
  fi
else
  echo "・無法即時確認進度，約 2 分鐘後網站就會更新"
fi
echo "🔗 https://dropout-tech.github.io/countryedu-web/"
read -r -p "按 Enter 關閉視窗…"
