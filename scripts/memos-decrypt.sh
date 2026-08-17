#!/usr/bin/env bash
# 解密备忘录（需要私钥）
# 用法:
#   memos-decrypt.sh                    批量: _private/*.md.age → _private/*.md
#   memos-decrypt.sh <文件>...          单文件: 解密当前目录下的指定文件 (a.md.age → a.md)
set -euo pipefail
KEY="$HOME/.config/age/memos-key.txt"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."

if [ $# -gt 0 ]; then
  # 单文件模式：在当前目录下解密指定文件
  for f in "$@"; do
    [ -f "$f" ] || { echo "❌ 找不到文件: $f"; exit 1; }
    out="${f%.age}"
    [ "$out" != "$f" ] || { echo "❌ 文件不是 .age 后缀: $f"; exit 1; }
    age -d -i "$KEY" -o "$out" "$f"
    echo "✅ 已解密 $f → $out"
  done
else
  # 批量模式：还原 _private/ 下全部文件
  for f in airdoc shinemo sunnybaer zju; do
    age -d -i "$KEY" -o "$ROOT/_private/开发信息备忘录_$f.md" "$ROOT/_private/开发信息备忘录_$f.md.age"
  done
  echo "✅ 已还原全部文件到 _private/"
fi
