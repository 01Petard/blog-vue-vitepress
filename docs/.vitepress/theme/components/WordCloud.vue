<script setup lang="ts">
import { computed } from 'vue'
import stats from 'virtual:blog-stats'

const props = withDefaults(
  defineProps<{
    /** content: 全站主题词云；tech: 技术栈词云（技术词合并统计） */
    type?: 'content' | 'tech'
    /** 是否显示"基于 N 篇文章统计"元信息 */
    showMeta?: boolean
  }>(),
  { type: 'content', showMeta: true }
)

/** 明暗主题下均可读的鲜艳色板，按排名轮换 */
const PALETTE = [
  '#e0547c',
  '#b45309',
  '#d97706',
  '#059669',
  '#0d9488',
  '#2563eb',
  '#7c3aed',
  '#c026d3',
]

/** 当前模式对应的词频数据（内容词云 / 合并后的技术栈词云） */
const words = computed(() => (props.type === 'content' ? stats.content : stats.tech))

/** 词频最大值，用于字号归一化 */
const maxCount = computed(() => words.value[0]?.count ?? 1)

/** 字号随词频做平方根压缩，避免高频词过大 */
function sizeFor(count: number): string {
  const size = 13 + 17 * Math.sqrt(count / maxCount.value)
  return `${size.toFixed(1)}px`
}

/** 更新时间：展示构建时生成的 UTC 字符串，不做时区转换，保证 SSR 与客户端一致 */
const updatedAtText = computed(() => stats.updatedAt.slice(0, 16).replace('T', ' '))
</script>

<template>
  <div class="word-cloud">
    <div class="cloud-content">
      <span
        v-for="(w, i) in words"
        :key="w.word"
        class="tag"
        :style="{ fontSize: sizeFor(w.count), color: PALETTE[i % PALETTE.length] }"
        :title="`${w.word} · 出现 ${w.count} 次 / ${w.mentions} 篇文章`"
      >
        {{ w.word }}
      </span>
    </div>

    <p v-if="showMeta" class="meta">
      基于 {{ stats.totalPosts }} 篇文章统计 · 编译时自动生成 · 更新于 {{ updatedAtText }}
    </p>
  </div>
</template>

<style scoped>
.word-cloud {
  margin: 8px 0 24px;
}

.cloud-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 14px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.tag {
  display: inline-block;
  font-weight: 600;
  line-height: 1.4;
  cursor: default;
  transition: transform 0.15s ease, filter 0.15s ease;
}

.tag:hover {
  transform: scale(1.12);
  filter: brightness(1.25);
  z-index: 1;
}

.meta {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-align: center;
}
</style>
