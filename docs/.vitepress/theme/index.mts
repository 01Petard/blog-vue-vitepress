// .vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme"

// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
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
  setup() {
    pictureZoom()
  },
}