# Site-wide Leaf Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the reference site's repeating leaf texture and matching light/dark overlays to every page of the VitePress site without changing existing content or layout.

**Architecture:** A local PNG supplies the repeating texture. Global CSS custom properties define the reference site's exact light and dark overlay values, while fixed pseudo-elements on `body` render the texture and radial mask behind VitePress. Existing VitePress layout surfaces receive translucent backgrounds for readability.

**Tech Stack:** VitePress 1.6, CSS custom properties and pseudo-elements, PNG static asset, pnpm 11

## Global Constraints

- Apply the background to the home page, article pages, category pages, and pages with sidebars
- Preserve the existing Markdown content, navigation, layout, and theme colors
- Use the verified `650 × 613` reference PNG as a local asset
- Use `background-repeat: repeat` without stretching the texture
- Use `255, 255, 255` for the light radial mask and `20, 20, 20` for the dark radial mask
- Use a `700%` radial-gradient transparent endpoint
- Use `rgba(255, 255, 255, .1)` for light translucent surfaces and `rgba(20, 20, 20, .7)` for dark translucent surfaces
- Do not add JavaScript, Vue components, runtime dependencies, or remote image requests
- Do not include unrelated untracked article files in any commit

---

## File Structure

- Create `docs/.vitepress/theme/assets/leaf-background.png`: exact local copy of the verified online texture
- Modify `docs/.vitepress/theme/index.css`: background tokens, fixed texture and mask layers, translucent VitePress surfaces, mobile and print rules
- Create `scripts/verify-leaf-background.sh`: repeatable static assertions for asset identity and required CSS behavior

### Task 1: Add a repeatable failing background contract check

**Files:**

- Create: `scripts/verify-leaf-background.sh`
- Test: `scripts/verify-leaf-background.sh`

**Interfaces:**

- Consumes: repository root, expected asset SHA-256 `418ea3e9d7c58c0f0144c540b67b889cd921ec2104f19730db9ba9fae50ff9c0`
- Produces: exit code `0` only when the asset and required global CSS contract exist

- [ ] **Step 1: Write the failing verification script**

```sh
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
```

- [ ] **Step 2: Run the script and verify RED**

Run: `sh scripts/verify-leaf-background.sh`

Expected: non-zero exit because `docs/.vitepress/theme/assets/leaf-background.png` does not exist

- [ ] **Step 3: Commit the failing contract check**

```bash
git add scripts/verify-leaf-background.sh
git commit -m "test: define leaf background contract"
```

### Task 2: Add the verified texture and global background layers

**Files:**

- Create: `docs/.vitepress/theme/assets/leaf-background.png`
- Modify: `docs/.vitepress/theme/index.css`
- Test: `scripts/verify-leaf-background.sh`

**Interfaces:**

- Consumes: CSS variables `--leaf-mask-rgb` and `--leaf-surface`
- Produces: fixed `body::before` texture layer, fixed `body::after` radial mask, translucent VitePress layout surfaces

- [ ] **Step 1: Copy the verified reference asset**

```bash
mkdir -p docs/.vitepress/theme/assets
cp /tmp/xuxing-bg.lY9kzd0O.png docs/.vitepress/theme/assets/leaf-background.png
```

- [ ] **Step 2: Add the minimal global CSS implementation**

Append the following rules to `docs/.vitepress/theme/index.css` while retaining its existing rules:

```css
:root {
    --leaf-mask-rgb: 255, 255, 255;
    --leaf-surface: rgba(255, 255, 255, .1);
}

html.dark {
    --leaf-mask-rgb: 20, 20, 20;
    --leaf-surface: rgba(20, 20, 20, .7);
}

html,
body,
#app,
.Layout {
    min-height: 100%;
    background: transparent;
}

body::before,
body::after {
    position: fixed;
    inset: 0;
    z-index: -2;
    content: "";
    pointer-events: none;
}

body::before {
    background-image: url(./assets/leaf-background.png);
    background-repeat: repeat;
}

body::after {
    z-index: -1;
    background: radial-gradient(
        ellipse,
        rgba(var(--leaf-mask-rgb), 1) 0%,
        rgba(var(--leaf-mask-rgb), 0) 700%
    );
}

.VPNav,
.VPSidebar,
.VPDoc .content-container,
.VPHome .VPFeature,
.VPHome .VPButton,
.VPHome .VPHomeFeatures .item {
    background-color: var(--leaf-surface);
}

@media print {
    body::before,
    body::after {
        display: none;
    }
}
```

- [ ] **Step 3: Run the contract check and verify GREEN**

Run: `sh scripts/verify-leaf-background.sh`

Expected: exit code `0` with no output

- [ ] **Step 4: Build the VitePress site**

Run: `pnpm build`

Expected: VitePress build completes successfully and `docs/.vitepress/dist/assets/` contains a hashed leaf background asset

- [ ] **Step 5: Commit the implementation**

```bash
git add docs/.vitepress/theme/assets/leaf-background.png docs/.vitepress/theme/index.css
git commit -m "feat: add site-wide leaf background"
```

### Task 3: Verify real pages in both color modes

**Files:**

- Modify: `docs/.vitepress/theme/index.css` only if visual verification exposes a selector or readability defect
- Test: built home page and one representative article page

**Interfaces:**

- Consumes: `pnpm dev`, VitePress `.dark` class, browser screenshots and computed styles
- Produces: verified desktop and mobile rendering in light and dark modes

- [ ] **Step 1: Start the local site**

Run: `pnpm dev --host 127.0.0.1`

Expected: local VitePress URL is printed without startup errors

- [ ] **Step 2: Verify the home page in light and dark modes**

Open `/` at `1440 × 900`, capture light and dark screenshots, and assert:

```text
body::before background-image contains leaf-background
body::before background-repeat equals repeat
body::after background-image contains radial-gradient
light --leaf-mask-rgb equals 255, 255, 255
dark --leaf-mask-rgb equals 20, 20, 20
```

- [ ] **Step 3: Verify an article page with a sidebar**

Open `/开发/后端/index.html` or another generated sidebar article route and confirm the navigation, sidebar, document text, links, and theme switch remain usable while the texture remains visible around translucent surfaces.

- [ ] **Step 4: Verify mobile rendering**

Repeat the home and article checks at `390 × 844`; confirm the texture retains its original repeat scale, the mobile menu opens, and no background layer captures clicks.

- [ ] **Step 5: Re-run automated verification**

Run: `sh scripts/verify-leaf-background.sh && pnpm build`

Expected: contract check exits `0`; VitePress build succeeds without new warnings or errors

- [ ] **Step 6: Commit visual corrections only when needed**

```bash
git add docs/.vitepress/theme/index.css
git commit -m "fix: refine leaf background readability"
```

Skip this commit when visual verification requires no CSS correction.
