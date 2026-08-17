#!/usr/bin/env bash
# 加密 4 个备忘录文件到 _private/（只读公钥，不需要私钥）
set -euo pipefail
KEY="$HOME/.config/age/memos-key.txt"
PUBKEY=$(awk '/^# public key:/{print $4}' "$KEY")
mkdir -p _private
for f in airdoc shinemo sunnybaer zju; do
  age -r "$PUBKEY" -o "_private/开发信息备忘录_$f.md.age" "docs/开发/开发信息备忘录_$f.md"
done
echo "已加密 4 个文件到 _private/"
