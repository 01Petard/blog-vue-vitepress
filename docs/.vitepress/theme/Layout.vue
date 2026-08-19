<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useData, useRoute } from "vitepress";
import { nextTick, provide } from "vue";
import GiscusComments from "./components/GiscusComments.vue";
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";

const { isDark } = useData();
const route = useRoute();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath },
    {
      duration: 800,
      easing: "ease-in",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
});
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <NolebaseEnhancedReadabilitiesMenu />
    </template>
    <template #nav-screen-content-after>
      <NolebaseEnhancedReadabilitiesScreenMenu />
    </template>
    <template #layout-top>
      <NolebaseHighlightTargetedHeading />
    </template>
    <template #doc-after>
      <GiscusComments :key="route.path" />
    </template>
  </DefaultTheme.Layout>
</template>
