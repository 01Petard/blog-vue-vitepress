import fs from 'node:fs/promises';
import path from 'node:path';
import {Feed} from 'feed';
import {type ContentData, createContentLoader, type SiteConfig} from 'vitepress';

/**
 * 永久地址用于 RSS 的订阅地址、文章链接和唯一标识。
 * GitHub Pages 会将它重定向到当前绑定的自定义域名。
 */
export const PERMANENT_SITE_URL = 'https://01petard.github.io/blog-vue-vitepress/';

/**
 * 当前对外域名仅用于 sitemap；更换自定义域名时只需要修改这里。
 */
export const CURRENT_SITE_URL = 'https://doc.bugstack.icu/';
export const RSS_PATH = 'feed.xml';
export const RSS_URL = new URL(RSS_PATH, PERMANENT_SITE_URL).href;

const ARTICLE_DATE_PATTERN =
  /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/;

/**
 * 兼容历史文章中未补零、未声明时区的日期，并统一按东八区解析。
 */
function parseArticleDate(value: unknown): Date | undefined {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }
  if (typeof value !== 'string') {
    return undefined;
  }

  const rawDate = value.trim();
  const match = ARTICLE_DATE_PATTERN.exec(rawDate);
  const normalizedDate = match
    ? `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}T` +
    `${(match[4] ?? '0').padStart(2, '0')}:${(match[5] ?? '0').padStart(2, '0')}:` +
    `${(match[6] ?? '0').padStart(2, '0')}+08:00`
    : rawDate;
  const date = new Date(normalizedDate);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map(tag => tag.trim()).filter(Boolean);
  }
  return typeof value === 'string'
    ? value.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];
}

function toArticle(page: ContentData) {
  const {frontmatter, url} = page;
  const date = parseArticleDate(frontmatter.date);
  if (
    !date ||
    !frontmatter.title ||
    frontmatter.draft === true ||
    frontmatter.rss === false ||
    url.endsWith('/')
  ) {
    return undefined;
  }

  return {
    title: String(frontmatter.title),
    description: String(frontmatter.description ?? ''),
    date,
    tags: normalizeTags(frontmatter.tags),
    url: new URL(url.replace(/^\//, ''), PERMANENT_SITE_URL).href
  };
}

/**
 * 构建结束后生成摘要型 RSS，避免正文中的相对资源地址在阅读器中失效。
 */
export async function generateRss(siteConfig: SiteConfig): Promise<void> {
  const pages = await createContentLoader('**/*.md').load();
  const articles = pages
    .map(toArticle)
    .filter(article => article !== undefined)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const feed = new Feed({
    title: '代码港湾',
    description: '个人技术知识体系矩阵',
    id: PERMANENT_SITE_URL,
    link: PERMANENT_SITE_URL,
    language: 'zh-CN',
    favicon: new URL('favicon.ico', PERMANENT_SITE_URL).href,
    copyright: 'Copyright © 2025-present 01Petard',
    updated: articles.at(0)?.date,
    feedLinks: {
      rss: RSS_URL
    },
    author: {
      name: '01Petard',
      link: 'https://github.com/01Petard'
    }
  });

  for (const article of articles) {
    feed.addItem({
      title: article.title,
      id: article.url,
      link: article.url,
      description: article.description,
      date: article.date,
      published: article.date,
      category: article.tags.map(name => ({name}))
    });
  }

  await fs.writeFile(path.join(siteConfig.outDir, RSS_PATH), feed.rss2(), 'utf-8');
}
