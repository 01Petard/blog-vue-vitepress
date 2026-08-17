#!/usr/bin/env bash
# 从 _private/ 还原明文（需要私钥）
set -euo pipefail
KEY="$HOME/.config/age/memos-key.txt"
for f in airdoc shinemo sunnybaer zju; do
  age -d -i "$KEY" -o "docs/开发/开发信息备忘录_$f.md" "_private/开发信息备忘录_$f.md.age"
done
echo "已还原 4 个文件"
