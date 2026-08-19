/**
 * 编译时动态的博客数据统计插件
 *
 * 扫描 docs/ 下全部文章正文，统计主题词频与技术栈数据，
 * 以 Vite 虚拟模块 `virtual:blog-stats` 暴露给客户端组件。
 * dev 与 build 都会执行（vite 插件双端生效），
 * dev 下监听 .md 文件变化并失效缓存，实现热更新。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const VIRTUAL_ID = "virtual:blog-stats";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

/** docs/ 根目录（插件位于 docs/.vitepress/plugins/ 下） */
const DOCS_ROOT = fileURLToPath(new URL("../../", import.meta.url));

/* ---------------- 词表与分类 ---------------- */

interface TechCategory {
  name: string;
  emoji: string;
  words: string[];
}

/** 技术栈分类词表（技术栈词云按此聚合，内容词云取全部词去重） */
const TECH_CATEGORIES: TechCategory[] = [
  {
    name: "后端",
    emoji: "🔧",
    words: [
      "java", "springboot", "springmvc", "spring", "mybatisplus", "mybatis",
      "jvm", "redis", "mysql", "postgresql", "sql", "jdbc", "tomcat",
      "kafka", "rabbitmq", "rocketmq", "netty", "mqtt", "websocket", "sse",
      "mcp", "restful", "fastjson", "thymeleaf", "jwt", "openldap",
      "分布式", "微服务", "高并发", "缓存", "数据库",
    ],
  },
  {
    name: "前端",
    emoji: "🎨",
    words: [
      "vue", "element", "javascript", "typescript", "html", "css",
      "vitepress", "vite", "node", "hexo", "npm", "markdown",
    ],
  },
  {
    name: "AI与数据",
    emoji: "🤖",
    words: [
      "ai", "llm", "大模型", "chatgpt", "gpt", "ollama", "stable diffusion",
      "pytorch", "yolo", "rag", "kag", "agent", "机器学习", "深度学习",
      "prompt", "aigc", "python", "anaconda", "conda", "jupyter", "uv",
      "torch", "算法", "图像处理",
    ],
  },
  {
    name: "系统与网络",
    emoji: "⚙️",
    words: [
      "linux", "ubuntu", "windows", "macos", "android", "zsh", "bash",
      "caddy", "headscale", "反向代理", "正向代理", "防火墙", "域名",
      "ssh", "shell",
    ],
  },
  {
    name: "硬件与嵌入式",
    emoji: "🔌",
    words: [
      "树莓派", "nas", "openwrt", "软路由", "casaos", "嵌入式", "开发板",
      "arm", "工控机", "固态硬盘", "虚拟机", "vmware",
    ],
  },
  {
    name: "工具链",
    emoji: "🛠️",
    words: [
      "git", "github", "gitlab", "jenkins", "cicd", "webhook", "docker",
      "nginx", "jetbrains", "intellij", "vscode", "homebrew", "obs",
      "ffmpeg", "curl", "jenv", "sdkman", "picgo", "claude", "postman",
      "json", "yaml", "uml",
    ],
  },
  {
    name: "生活与爱好",
    emoji: "🌸",
    words: ["动漫", "动画", "游戏", "galgame", "二次元", "小说", "漫画"],
  },
];

/** 内容词云词表：全部技术词 + 生活词，去重 */
const CONTENT_WORDS = [
  ...new Set(TECH_CATEGORIES.flatMap((c) => c.words)),
];

/** 技术栈词云词表：仅技术分类（不含"生活与爱好"），合并去重 */
const TECH_WORDS = [
  ...new Set(TECH_CATEGORIES.slice(0, -1).flatMap((c) => c.words)),
];

/* ---------------- 数据统计 ---------------- */

export interface WordStat {
  word: string;
  count: number;
  mentions: number;
}

export interface BlogStats {
  /** 生成时间（ISO 字符串） */
  updatedAt: string;
  /** 参与统计的文章数 */
  totalPosts: number;
  /** 全站主题词频（按次数降序，取前 60） */
  content: WordStat[];
  /** 技术栈词频（所有技术分类合并，按次数降序，取前 50） */
  tech: WordStat[];
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if ([".vitepress", "public", "cache", "dist", "node_modules"].includes(ent.name)) continue;
      out.push(...walk(p));
    } else if (ent.name.endsWith(".md")) {
      out.push(p);
    }
  }
  return out;
}

/** 提取正文：去 frontmatter / 代码块 / HTML / 图片，链接保留文字 */
function clean(full: string): string {
  let t = full;
  t = t.replace(/^---[\s\S]*?---/, "");
  t = t.replace(/```[\s\S]*?```/g, " ");
  t = t.replace(/<[^>]+>/g, " ");
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  t = t.replace(/https?:\/\/\S+/g, " ");
  return t.toLowerCase();
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 统计单篇文章中某个词的匹配次数 */
function countInText(text: string, word: string): number {
  if (/\w/.test(word)) {
    const re = new RegExp(`\\b${escapeRegExp(word)}\\b`, "g");
    return text.match(re)?.length ?? 0;
  }
  let idx = 0;
  let n = 0;
  while ((idx = text.indexOf(word, idx)) !== -1) {
    n++;
    idx += word.length;
  }
  return n;
}

function computeStats(): BlogStats {
  // 目录/索引页与 about 页是导航文字，不参与统计
  const files = walk(DOCS_ROOT).filter(
    (f) => !/index\.md$/.test(f) && !/about\.md$/.test(f)
  );

  // 同时统计内容词与全部技术词（技术词为内容词子集，只需按全词表统计一次）
  const counts = new Map<string, number>();
  const mentions = new Map<string, number>();
  for (const word of CONTENT_WORDS) {
    counts.set(word, 0);
    mentions.set(word, 0);
  }

  for (const f of files) {
    const text = clean(fs.readFileSync(f, "utf8"));
    for (const word of CONTENT_WORDS) {
      const n = countInText(text, word);
      if (n > 0) {
        counts.set(word, counts.get(word)! + n);
        mentions.set(word, mentions.get(word)! + 1);
      }
    }
  }

  const toStats = (words: string[]): WordStat[] =>
    words
      .map((w) => ({ word: w, count: counts.get(w)!, mentions: mentions.get(w)! }))
      .filter((x) => x.count > 0)
      .sort((a, b) => b.count - a.count);

  return {
    updatedAt: new Date().toISOString(),
    totalPosts: files.length,
    content: toStats(CONTENT_WORDS).slice(0, 60),
    tech: toStats(TECH_WORDS).slice(0, 50),
  };
}

/* ---------------- Vite 插件 ---------------- */

export function createBlogStatsPlugin(): Plugin {
  return {
    name: "blog-stats",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id === RESOLVED_ID) {
        return `export default ${JSON.stringify(computeStats())}`;
      }
    },
    configureServer(server) {
      // .md 新增/删除/修改时失效模块缓存，配合 VitePress 的整页重载
      // 使下次页面加载时重新计算词频
      server.watcher.on("change", (file) => {
        if (typeof file === "string" && file.endsWith(".md")) {
          invalidate(server);
        }
      });
      server.watcher.on("add", (file) => {
        if (typeof file === "string" && file.endsWith(".md")) {
          invalidate(server);
        }
      });
      server.watcher.on("unlink", (file) => {
        if (typeof file === "string" && file.endsWith(".md")) {
          invalidate(server);
        }
      });
    },
  };
}

function invalidate(server: Parameters<NonNullable<Plugin["configureServer"]>>[0]) {
  const mod = server.moduleGraph.idToModuleMap.get(RESOLVED_ID);
  if (mod) {
    server.moduleGraph.invalidateModule(mod);
  }
}
