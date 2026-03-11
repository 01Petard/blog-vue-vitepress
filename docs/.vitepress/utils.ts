// .vitepress/utils.ts
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// 获取当前文件所在目录及文档根目录（假设 utils.ts 和 config.mts 都在 .vitepress 下）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_DIR = path.resolve(__dirname, '../'); // 指向上一级的 docs 目录

/**
 * 自动生成侧边栏的递归函数（按本地文件创建时间排序）
 *
 * 注意：由于 CI/CD 部署时会丢失本地操作系统的时间属性，
 * 如果在服务器上构建，此时间排序可能会失效。
 */
export function generateSidebar(routePath: string) {
  const fullPath = path.join(DOCS_DIR, routePath);
  const items: any[] = [];

  if (!fs.existsSync(fullPath)) return items;

  const files = fs.readdirSync(fullPath);

  // 第一步：遍历当前目录下的所有项目，提取创建时间
  const parsedItems = files.map(file => {
    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);
    const isDirectory = stat.isDirectory();

    // 获取文件创建时间的时间戳 (birthtimeMs)。如果拿不到，用修改时间兜底
    const createTime = stat.birthtimeMs || stat.mtimeMs;

    let displayText = file;
    if (!isDirectory && displayText.endsWith('.md')) {
      displayText = displayText.replace(/\.md$/, '');
    }

    return {
      file,
      isDirectory,
      createTime,
      displayText
    };
  });

  // 第二步：自定义排序逻辑
  parsedItems.sort((a, b) => {
    // 规则 1：先展示文件，后展示目录
    if (a.isDirectory !== b.isDirectory) {
      return a.isDirectory ? 1 : -1;
    }
    // 规则 2：按创建时间排序，降序（最新创建的排在最前）
    return b.createTime - a.createTime;
  });

  // 第三步：基于排序好的数组构建 VitePress 侧边栏配置
  for (const item of parsedItems) {
    if (item.isDirectory) {
      // 忽略隐藏目录及部分公共目录
      if (item.file.startsWith('.') || ['public', 'assets', 'images'].includes(item.file)) {
        continue;
      }
      const children = generateSidebar(path.join(routePath, item.file));
      if (children.length > 0) {
        items.push({
          text: item.displayText,
          collapsed: false,
          items: children
        });
      }
    } else if (item.file.endsWith('.md') && item.file !== 'index.md') {
      const fileName = item.file.replace('.md', '');
      const link = `/${routePath}/${fileName}`.replace(/\\/g, '/');
      items.push({
        text: item.displayText,
        link: link
      });
    }
  }
  return items;
}