# CR 圈黑话手册

## 0. 总览

| 人处在哪个环节 | 该说的词 |
|---|---|
| 我看完了，没问题 | **LGTM** / **Ship it** / **+1** |
| 想法不错，可以做 | **SGTM** |
| 请你来看一眼 | **PTAL** |
| 我提个意见 | **NIT → SHOULD FIX → BLOCKER** |
| 我还没做完 | **WIP** / **DRAFT** |
| 什么时候给你 | **ETA** / **EOD** / **EOW** |

---

## 1. 认可类：「我看没问题」

| 缩写 / 表达 | 全称 | 中文 | 场景 | 强度 |
|---|---|---|---|---|
| **LGTM** | Looks Good To Me | 我看没问题 | 代码评审、方案确认、设计稿 | ★★★★ 已检查过 |
| **SGTM** | Sounds Good To Me | 听起来不错 | 讨论想法、开会定方案 | ★★★ 讨论阶段 |
| **Ship it** | — | 可以发布 / 可以上线 | 发布决策 | ★★★★ 拍板 |
| **Good to go** | — | 可以开始了 / 就绪 | 项目、发布、任务准备 | ★★★★ 就绪 |
| **OK to merge** | — | 可以合并 | GitHub / GitLab PR / MR | ★★★★ 明确合并 |
| **Approve** | — | 批准 | 平台正式评审状态 | ★★★★★ 系统级 |
| **No objections** | — | 我没意见 | 决策、方案确认 | ★★★ 不反对≠赞成 |
| **Works for me** | — | 这个安排我能接受 | 时间、流程、协作方式 | ★★★ 安排类 |
| **+1** | plus one | 我同意 | 群聊、会议、方案讨论 | ★★★ |
| **OK** | Okay | 可以 | 通用 | ★★ |

### 四个高频词的差别

| 词 | 真正表达的意思 | 容易导致的歧义 |
|---|---|---|
| **LGTM** | 内容我看过了，我觉得行 | 没批准合并时不要说 |
| **SGTM** | 你的想法我认可 | 要先看过代码 |
| **Ship it** | 别吵了，发吧 | 不要越权 |
| **Approve** | 我行使了正式审批权 | 不要口头说，会变成"假批准" |

---

## 2. 请求类：「请你看看」

| 缩写 | 全称 | 中文 | 场景 |
|---|---|---|---|
| **PTAL** | Please Take A Look | 请帮忙看看 | 提 PR、发方案、请求 review |
| **RFR** | Ready for Review | 可以开始评审了 | PR、文档、设计稿 |
| **RFC** | Request for Comments | 征求意见 / 请求评论 | 技术方案、设计文档 |
| **RFI** | Request for Information | 请求补充信息 | 项目、采购、方案沟通 |
| **PR** | Pull Request | 合并请求 | GitHub |
| **MR** | Merge Request | 合并请求 | GitLab |
| **CR** | Code Review | 代码评审 | 开发流程 |
| **Please review** | — | 请评审 | 正式 |
| **Take a look** | — | 看一下 | 非正式 |
| **Bump** | — | 顶一下 / 提醒一下 | 催评审、催回复（第 2 次催） |
| **Ping** | — | 戳一下 | 找人、催进度（轻量） |

> **PTAL 与 RFR 的分工**：RFR 是"我准备好了，随时可以看"；PTAL 是"劳驾你现在花时间看"。前者是状态，后者是动作。

---

## 3. 意见类：「我提个意见」

| 严重度 | 标签 | 中文 | 是否阻塞合并 | 作者该怎么做 |
|---|---|---|---|---|
| 🔴 P0 | **BLOCKER** | 阻塞问题 | 必须解决 | 立刻改，改完再谈 |
| 🔴 P0 | **MUST FIX** | 必须修改 | 必须解决 | 本轮改完 |
| 🟠 P1 | **REQUEST CHANGES** | 请求修改 | 平台级驳回 | 逐条回应后再提审 |
| 🟠 P1 | **SHOULD FIX** | 建议修改 | 通常不阻塞 | 有异议可讨论 |
| 🟡 P2 | **NIT** | 小问题 / 吹毛求疵 | 不阻塞 | 可改可让，别争 |
| 🟡 P2 | **SUGGESTION** | 建议 | 不阻塞 | 参考即可 |
| 🟢 P3 | **CAN FIX** | 可以修改 / **OPTIONAL** | 不阻塞 | 全凭自愿 |
| ⚪ 记录 | **TODO** / **FIXME** | 待办 / 待修复 | 不阻塞 | 留注释，后续处理 |
| ⚪ 说明 | **NOTE** | 补充说明 | — | 无需动作 |
| ⚪ 提问 | **QUESTION** | 请作者解释 | 视回复而定 | 给出解释或补测试 |
| 🔵 状态 | **PENDING** | 待定 / 等待中 | 暂时搁置 | 等 CI、等回复、等确认 |

> **写意见的规矩**：每条意见以标签开头 → 一句说清问题 → 一句说清期望。**NIT 不要写成 BLOCKER**，这是最招人烦的用法。

---

## 4. 状态类：「进度到哪了」

| 缩写 | 全称 | 中文 | 场景 |
|---|---|---|---|
| **WIP** | Work In Progress | 进行中，未完成 | PR 标题、任务、文档 |
| **DRAFT** | Draft | 草稿 | PR、文档、方案 |
| **TODO** | To Do | 待办事项 | 代码注释、任务管理 |
| **TBD** | To Be Determined | 待定（还没人定） | 时间、负责人、方案 |
| **TBC** | To Be Confirmed | 待确认（有人定了待点头） | 安排、细节 |
| **ETA** | Estimated Time of Arrival | 预计完成时间 | 项目进度、交付 |
| **EOD** | End of Day | 今天下班前 | 截止时间 |
| **EOW** | End of Week | 本周结束前 | 截止时间 |
| **ASAP** | As Soon As Possible | 尽快 | 催进度、高优先级（少用，会贬值） |
| **OOO** | Out of Office | 不在办公室 / 休假 | 邮件自动回复、状态 |
| **POC** | Proof of Concept | 概念验证 | 技术方案、可行性验证 |
| **MVP** | Minimum Viable Product | 最小可行产品 | 产品、项目规划 |
| **Milestone** | — | 里程碑 | 项目阶段 |
| **Backlog** | — | 待办池 / 需求池 | 项目管理 |
| **Follow-up** | — | 后续事项 | 会议、任务、问题跟踪 |

> **TBD vs TBC**：TBD 是"这事儿还没定"；TBC 是"基本定了，等最后确认"。给老板汇报时用错会被追问。

---

## 5. 日常沟通类

| 缩写 | 全称 | 中文 | 场景 |
|---|---|---|---|
| **FYI** | For Your Information | 供你参考 | 转发信息、同步情况 |
| **FYR** | For Your Reference | 供你参考 | 资料、文档 |
| **TL;DR** | Too Long; Didn't Read | 太长不看版 / 一句话摘要 | 长文总结（写在开头） |
| **ACK** | Acknowledged | 收到 / 确认 | 任务、消息确认 |
| **NACK** | Not Acknowledged | 未确认 / 拒绝 | 技术协议、消息确认 |
| **CC** | Carbon Copy | 抄送 | 邮件、消息 |
| **BCC** | Blind Carbon Copy | 密送 | 邮件 |
| **IMO** | In My Opinion | 我认为 | 表达观点 |
| **IMHO** | In My Humble Opinion | 我个人浅见 | 委婉表达观点 |
| **AFAIK** | As Far As I Know | 据我所知 | 不确定但给当前认知 |
| **YMMV** | Your Mileage May Vary | 效果因人而异 | 方案、工具、经验建议 |
| **BTW** | By The Way | 顺便说一下 | 补充信息 |
| **TBH** | To Be Honest | 说实话 | 非正式（多用于提反对意见前的缓冲） |
| **IDK** | I Don't Know | 我不知道 | 非正式 |

---

## 6. 例句

**提 PR**

> PTAL, thanks. / 请帮忙看一下，谢谢。
> [WIP] Add login API — ETA: EOD / 进行中：添加登录接口，预计今天下班前完成。

**通过**

> LGTM, nice work. / 我看没问题，干得不错。
> LGTM with one nit. / 整体没问题，有一个小建议。

**有条件通过**

> SGTM, but please add tests. / 听起来不错，但请加测试。
> Not LGTM yet — please fix the CI failure. / 还不能过，请先修 CI。

**打回**

> BLOCKER: this will break production. / 阻塞问题：这会导致生产环境故障。
> NIT: rename this variable for clarity. / 小建议：给这个变量改个更清晰的名字。

**催**

> PTAL when you have time. / 有空请帮忙看一下。
> Bump — waiting for review. / 顶一下，还在等评审。

**确认能否合并**

> Did you approve it in GitHub? / 你在 GitHub 上点 Approve 了吗？
> Is it OK to merge now? / 现在可以合并了吗？
