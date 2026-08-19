// .vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme"
import { h, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'

import "vitepress-markdown-timeline/dist/theme/index.css";
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'
import mediumZoom from 'medium-zoom';
import './index.css';

function pictureZoom() {
  const route = useRoute();
  const initZoom = () => {
    // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
    // mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    // 除a标签以下的所有图像都进行缩放
    mediumZoom(':not(a) > img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
  };
  onMounted(() => {
    initZoom();
  });
  watch(
    () => route.path,
    () => nextTick(() => initZoom())
  );
}

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      'layout-top': () => h(NolebaseHighlightTargetedHeading),
    }),
  setup() {
    pictureZoom()
  },
}
