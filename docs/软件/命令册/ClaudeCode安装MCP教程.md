## Claude Code常用命令

```shell
claude mcp list
```

```shell
claude mcp remove [MCP名字]
```

编程MCP：

1. Chrome DevTools MCP: 操控浏览器进行页面调试、网络分析和自动化检查：https://github.com/ChromeDevTools/chrome-devtools-mcp

   ```shell
   claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
   ```

2. Neon MCP: 按需创建和管理 Serverless PostgreSQL 数据库：https://neon.com/docs/ai/connect-mcp-clients-to-neon

   得先登录网页端，然后会自动将ClaudeCode、Cursor、VsCode都添加上Neon

   ```shell
   npx neonctl@latest init
   ```

3. Supabase MCP: 集成认证、数据库、存储和实时能力的一体化后端服务：https://supabase.com/docs/guides/getting-started/mcp

   先要选择一个项目，然后再添加

   ```shell
   claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=qvweszisegvbbwquznhr"
   ```

4. Figma MCP: 读取和修改 Figma 设计稿以实现设计到代码的自动化：https://github.com/GLips/Figma-Context-MCP

5. Context7 MCP: 将官方实时最新文档转化为可靠上下文以减少 AI 幻觉：https://github.com/upstash/context7

   ```shell
   claude mcp add context7 -- npx -y @upstash/context7-mcp
   ```

   ```shell
   claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
   ```

6. Ref MCP: 和 context7 差不多

7. Replicate MCP: 调用图片生成接口，可用于生成配图：https://github.com/awkoy/replicate-flux-mcp

   ```shell
   claude mcp add replicate npx replicate-flux-mcp
   ```

8. Vercel MCP: 自动部署前端应用并生成预览环境

9. EdgeOne Pages MCP: 提供国内友好的前端静态站点托管与发布

10. Cloudflare MCP: 管理边缘计算资源如 Workers、KV 和 R2

11. GitHub MCP: 直接操作访问代码仓库、PR、Issue 和 CI 流程

12. Stripe MCP: 自动化创建和管理支付、订阅及 Webhook

13. ShadCN MCP: 生成可直接使用的 React + Tailwind UI 组件

14. Semgrep MCP: 对代码进行静态安全扫描和规则检测

15. MCP SDK: 用于开发和接入自定义 MCP 工具的官方开发包