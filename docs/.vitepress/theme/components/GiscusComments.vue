<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const giscusContainer = ref<HTMLDivElement | null>(null)

const GISCUS_ORIGIN = 'https://giscus.app'

function currentTheme(): 'light' | 'dark' {
  return isDark.value ? 'dark' : 'light'
}

function syncTheme() {
  window.postMessage(
    { giscus: { setConfig: { theme: currentTheme() } } },
    GISCUS_ORIGIN
  )
}

let removeMessageListener: (() => void) | null = null

onMounted(() => {
  // Vue 模板中不能放 <script> 标签，只能在挂载后动态创建
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', '01Petard/GiscusDiscussions')
  script.setAttribute('data-repo-id', 'R_kgDOT6zCAg')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOT6zCAs4DDjZi')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  // 首次加载即使用当前主题，避免 iframe 首帧主题错误
  script.setAttribute('data-theme', currentTheme())

  giscusContainer.value?.appendChild(script)

  // lazy 模式下 iframe 滚入视口才创建，可能晚于主题切换，需在 iframe
  // 就绪（或出错）时补发一次主题，覆盖 postMessage 被丢弃的时间窗
  const handler = (event: MessageEvent) => {
    if (event.origin !== GISCUS_ORIGIN) return
    const data = event.data as { giscus?: { event?: string } } | null
    const ev = data?.giscus?.event
    if (ev === 'ready' || ev === 'error') syncTheme()
  }
  window.addEventListener('message', handler)
  removeMessageListener = () => window.removeEventListener('message', handler)
})

watch(isDark, syncTheme)

onBeforeUnmount(() => {
  removeMessageListener?.()
})
</script>

<template>
  <div class="giscus-wrapper">
    <h2 class="giscus-title">评论</h2>
    <div ref="giscusContainer" class="giscus-container" />
  </div>
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid var(--vp-c-divider);
}

.giscus-title {
  margin: 0 0 16px;
  color: var(--vp-c-text-1);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.giscus-container {
  width: 100%;
}
</style>
