#!/bin/sh
set -eu

asset='docs/.vitepress/theme/assets/leaf-background.png'
css='docs/.vitepress/theme/index.css'
expected_hash='418ea3e9d7c58c0f0144c540b67b889cd921ec2104f19730db9ba9fae50ff9c0'

test -f "$asset"
test "$(shasum -a 256 "$asset" | awk '{print $1}')" = "$expected_hash"
grep -Fq -- '--leaf-mask-rgb: 255, 255, 255' "$css"
grep -Fq -- '--leaf-surface: rgba(255, 255, 255, .1)' "$css"
grep -Fq -- '--leaf-mask-rgb: 20, 20, 20' "$css"
grep -Fq -- '--leaf-surface: rgba(20, 20, 20, .7)' "$css"
grep -Fq 'url(./assets/leaf-background.png)' "$css"
grep -Fq 'background-repeat: repeat' "$css"
grep -Fq 'rgba(var(--leaf-mask-rgb), 0) 700%' "$css"
grep -Fq '.VPNav' "$css"
grep -Fq '.VPSidebar' "$css"
grep -Fq '.VPDoc .content-container' "$css"
grep -Fq '@media print' "$css"
