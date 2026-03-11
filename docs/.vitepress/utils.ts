import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execSync} from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_DIR = path.resolve(__dirname, '../');

/**
 * 获取文件的 Git 首次提交时间戳（毫秒）
 */
function getFileCreateTime(filePath: string): number {
  try {
    // 执行 git 命令获取该文件的所有提交时间戳 (Unix 时间戳，秒)
    const output = execSync(`git log --format=%at -- "${filePath}"`, {stdio: 'pipe'}).toString().trim();
    if (output) {
      // git log 默认按时间倒序（最新的在最上面），所以最后一行就是首次提交时间
      const timestamps = output.split('\n');
      const firstCommitTime = timestamps[timestamps.length - 1];
      return parseInt(firstCommitTime, 10) * 1000;
    }
  } catch (error) {
    // 如果文件是本地新建的，还没 commit 过，git log 会报错，这里捕获并忽略
  }

  // 兜底逻辑：如果在 Git 中找不到（比如未追踪的新文件），退回使用本地操作系统的修改时间
  const stat = fs.statSync(filePath);
  return stat.mtimeMs || stat.birthtimeMs || Date.now();
}

/**
 * 自动生成侧边栏的递归函数
 * @param routePath 路由路径 (如 '开发')
 * @param isCollapsed 是否默认折叠子目录 (默认 false：展开)
 */
export function generateSidebar(routePath: string, isCollapsed: boolean = false) {
  const fullPath = path.join(DOCS_DIR, routePath);
  const items: any[] = [];

  if (!fs.existsSync(fullPath)) return items;

  const files = fs.readdirSync(fullPath);

  // 1. 遍历当前目录下的所有项目，提取 Git 创建时间
  const parsedItems = files.map(file => {
    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);
    const isDirectory = stat.isDirectory();

    // 调用上面封装好的 Git 时间获取函数
    const createTime = getFileCreateTime(filePath);

    let displayText = file;
    if (!isDirectory && displayText.endsWith('.md')) {
      displayText = displayText.replace(/\.md$/, '');
    }

    return {file, isDirectory, createTime, displayText};
  });

  // 2. 自定义排序逻辑
  parsedItems.sort((a, b) => {
    // 规则 1：先展示文件，后展示目录
    if (a.isDirectory !== b.isDirectory) {
      return a.isDirectory ? 1 : -1;
    }
    // 规则 2：按创建时间排序，降序（最新创建的排在最前）
    return b.createTime - a.createTime;
  });

  // 3. 基于排序好的数组构建 VitePress 侧边栏配置
  for (const item of parsedItems) {
    if (item.isDirectory) {
      if (item.file.startsWith('.') || ['public', 'assets', 'images'].includes(item.file)) {
        continue;
      }
      const children = generateSidebar(path.join(routePath, item.file), isCollapsed);
      if (children.length > 0) {
        items.push({
          text: item.displayText,
          collapsed: isCollapsed,
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