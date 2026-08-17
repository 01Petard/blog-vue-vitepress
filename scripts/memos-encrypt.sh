#!/usr/bin/env bash
# 加密备忘录（只读公钥，不需要私钥）
# 用法:
#   memos-encrypt.sh                    批量: _private/*.md → _private/*.md.age
#   memos-encrypt.sh <文件>...          单文件: 加密当前目录下的指定文件 (a.md → a.md.age)
set -euo pipefail
KEY="$HOME/.config/age/memos-key.txt"
PUBKEY=$(awk '/^# public key:/{print $4}' "$KEY")
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."

if [ $# -gt 0 ]; then
  # 单文件模式：在当前目录下加密指定文件
  for f in "$@"; do
    [ -f "$f" ] || { echo "❌ 找不到文件: $f"; exit 1; }
    age -r "$PUBKEY" -o "$f.age" "$f"
    echo "✅ 已加密 $f → $f.age"
  done
else
  # 批量模式：加密 _private/ 下全部文件
  for f in airdoc shinemo sunnybaer zju; do
    age -r "$PUBKEY" -o "$ROOT/_private/开发信息备忘录_$f.md.age" "$ROOT/_private/开发信息备忘录_$f.md"
  done
  echo "✅ 已加密全部文件到 _private/"
fi
