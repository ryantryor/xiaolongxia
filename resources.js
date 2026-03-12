// 精选 OpenClaw 资源数据（扩充版）
const categoryMeta = {
    official: { icon: '📖', label: '官方资源', color: '#3b82f6' },
    'getting-started': { icon: '🏁', label: '入门部署', color: '#10b981' },
    'channel-integration': { icon: '📱', label: '平台接入', color: '#8b5cf6' },
    'skill-dev': { icon: '🧩', label: '技能开发', color: '#f97316' },
    video: { icon: '📹', label: '视频教程', color: '#ef4444' },
    'deep-dive': { icon: '🔬', label: '深度文章', color: '#4f46e5' },
    tools: { icon: '🔧', label: '工具与插件', color: '#14b8a6' },
    'cloud-deploy': { icon: '☁️', label: '云平台部署', color: '#0ea5e9' },
    'use-cases': { icon: '💡', label: '玩法与场景', color: '#f59e0b' },
};

const resources = [
    // ============ Official Resources ============
    { title: 'OpenClaw 官方文档', desc: '完整的 API 参考、配置指南和架构说明', url: 'https://docs.openclaw.ai', source: 'OpenClaw', category: 'official', tags: ['文档', '必读'] },
    { title: 'GitHub — openclaw/openclaw', desc: '源代码、Issue 跟踪、社区贡献指南 (279k+ ⭐)', url: 'https://github.com/openclaw/openclaw', source: 'GitHub', category: 'official', tags: ['源码', '开源'] },
    { title: 'ClawHub 技能市场', desc: '发现、安装和分享 5000+ AI 技能插件', url: 'https://clawhub.com', source: 'ClawHub', category: 'official', tags: ['技能', '市场'] },
    { title: '官方入门指南 — Getting Started', desc: '从零到第一次对话的最快路径', url: 'https://docs.openclaw.ai/start/getting-started', source: 'OpenClaw Docs', category: 'official', tags: ['入门', '必读'] },
    { title: 'Discord 社区', desc: '与数万开发者和用户实时交流', url: 'https://discord.com/invite/clawd', source: 'Discord', category: 'official', tags: ['社区', '讨论'] },
    { title: 'The Verge — OpenClaw 新闻聚合', desc: '权威科技媒体持续跟踪报道', url: 'https://www.theverge.com/news/872091/openclaw-moltbot-clawdbot-ai-agent-news', source: 'The Verge', category: 'official', tags: ['新闻', '权威'] },
    { title: 'ClawHub Skills 源码仓库', desc: '所有已发布技能的源码归档', url: 'https://github.com/openclaw/skills', source: 'GitHub', category: 'official', tags: ['技能', '源码'] },

    // ============ Cloud Deploy ============
    { title: '阿里云 — 部署 OpenClaw 构建钉钉 AI 助理', desc: '轻量应用服务器一键部署，可视化配置面板接入钉钉', url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw', source: '阿里云', category: 'cloud-deploy', tags: ['阿里云', '钉钉', '一键'] },
    { title: '阿里云 — AppFlow 集成企业微信', desc: '通过应用连接器将 OpenClaw 与企业微信集成，群聊直接交互', url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/openclaw-enterprise-wechat-integration', source: '阿里云', category: 'cloud-deploy', tags: ['阿里云', '企业微信'] },
    { title: '腾讯云 — OpenClaw 接入飞书保姆级教程', desc: 'Lighthouse 一键部署 + 飞书机器人全流程配置', url: 'https://cloud.tencent.com/developer/article/2625073', source: '腾讯云', category: 'cloud-deploy', tags: ['腾讯云', '飞书'] },
    { title: '腾讯云 — OpenClaw 接入企业微信完全指南', desc: '可视化配置面板，几步完成企业微信接入', url: 'https://cloud.tencent.com/developer/article/2625147', source: '腾讯云', category: 'cloud-deploy', tags: ['腾讯云', '企业微信'] },
    { title: 'AWS 中国 — Mac 实例部署 OpenClaw', desc: '亚马逊云科技 Mac 实例部署，苹果生态自动化最佳选择', url: 'https://aws.amazon.com/cn/blogs/china/openclaw-deployment-aws-mac/', source: 'AWS', category: 'cloud-deploy', tags: ['AWS', 'Mac'] },
    { title: 'DigitalOcean — One-Click Deploy OpenClaw', desc: 'DigitalOcean 一键部署方案', url: 'https://www.digitalocean.com/community/tutorials/how-to-run-openclaw', source: 'DigitalOcean', category: 'cloud-deploy', tags: ['DigitalOcean'] },
    { title: 'Hostinger — VPS 搭建 OpenClaw', desc: 'Hostinger VPS 分步指南', url: 'https://www.hostinger.com/tutorials/how-to-set-up-openclaw', source: 'Hostinger', category: 'cloud-deploy', tags: ['Hostinger', 'VPS'] },
    { title: '阿里云开发者 — 2026年部署教程及 FAQ', desc: '百炼模型配置、通义千问接入，含高频 FAQ 和 JSON 示例', url: 'https://developer.aliyun.com/article/1709761', source: '阿里云', category: 'cloud-deploy', tags: ['百炼', '通义千问'] },

    // ============ Getting Started ============
    { title: 'OpenClaw 下载安装使用 — 详细图文教程', desc: '系统要求、多种安装方式对比、常见问题排查', url: 'https://apifox.com/apiskills/openclaw-installation-and-usage-guide/', source: 'Apifox', category: 'getting-started', tags: ['图文', '新手友好'] },
    { title: '小白零基础教程 — 安装 OpenClaw', desc: '零基础也能看懂，Telegram 连接详细步骤', url: 'https://www.cnblogs.com/gyc567/p/19561281', source: '博客园', category: 'getting-started', tags: ['零基础', 'Telegram'] },
    { title: 'ClawdBot 火爆全网 — 手把手部署 + 钉钉操作', desc: '国内用户部署指南，含踩坑经验和钉钉接入', url: 'https://www.53ai.com/news/OpenSourceLLM/2026012862704.html', source: '53AI', category: 'getting-started', tags: ['部署', '钉钉'] },
    { title: '怎么用上一夜爆火的 Clawdbot — 详细配置教程', desc: '实测踩了三个大坑，分享避坑指南', url: 'https://news.qq.com/rain/a/20260127A05EEN00', source: '腾讯新闻', category: 'getting-started', tags: ['避坑', '实测'] },
    { title: 'Openclaw 安装部署一文详解 + 国产平替方案', desc: '产品介绍、官网资源、本地/云端部署四维度全面解析', url: 'https://www.ai-indeed.com/article/15272.html', source: '实在智能', category: 'getting-started', tags: ['全面', '平替'] },
    { title: '菜鸟教程 — OpenClaw (Clawdbot) 完整教程', desc: '从 git clone 到 pnpm build，含开发模式全流程', url: 'https://www.runoob.com/ai-agent/openclaw-clawdbot-tutorial.html', source: '菜鸟教程', category: 'getting-started', tags: ['菜鸟教程', '源码编译'] },
    { title: '搬主题 — 一键安装超详细图文教程', desc: '含钉钉/飞书/微信/Web 四种集成方法，国内首选', url: 'https://www.banzhuti.com/openclaw-moltbot-clawdbot-tutorial.html', source: '搬主题', category: 'getting-started', tags: ['钉钉', '飞书', '微信'] },
    { title: '痴者工良 — 手把手教你部署 OpenClaw', desc: '配置飞书 Bot 全流程', url: 'https://www.cnblogs.com/whuanle/p/19558535', source: '博客园', category: 'getting-started', tags: ['飞书', '配置'] },
    { title: '掘金 — 从0搭建本地 AI 助手完整记录', desc: '架构理解和踩坑笔记', url: 'https://juejin.cn/post/7600752623068102666', source: '掘金', category: 'getting-started', tags: ['实战', '本地部署'] },
    { title: '至顶AI — 全网最详细部署指南', desc: '从环境准备到飞书插件，十大经典应用场景推荐', url: 'https://news.qq.com/rain/a/20260202A04NT600', source: '腾讯新闻', category: 'getting-started', tags: ['全面', '亲测'] },
    { title: 'CSDN — 史上最全保姆级安装配置教程', desc: '多平台接入、Docker 沙箱安全、Ollama 本地模型对接', url: 'https://blog.csdn.net/liwang0113/article/details/157579187', source: 'CSDN', category: 'getting-started', tags: ['保姆级', 'Docker'] },
    { title: 'DAMO — Mac mini + DeepSeek + 飞书', desc: '命令行安装 + DeepSeek 配置 + 飞书插件全流程', url: 'https://damodev.csdn.net/697dff7b7c1d88441d90f0e4.html', source: 'CSDN', category: 'getting-started', tags: ['Mac', 'DeepSeek'] },
    { title: 'OpenClaw + Ollama 本地 AI Agent 搭建', desc: 'Ollama 本地模型集成指南，含模型选型对比和性能基准', url: 'https://codersera.com/blog/openclaw-ollama-setup-guide-run-local-ai-agents-2026', source: 'CoderSera', category: 'getting-started', tags: ['Ollama', '本地模型'] },
    { title: 'Full Tutorial: Set Up Your 24/7 AI Employee', desc: '20分钟从零到运行', url: 'https://creatoreconomy.so/p/full-tutorial-set-up-your-247-ai-employee-clawd-molt', source: 'Creator Economy', category: 'getting-started', tags: ['快速', '20分钟'] },
    { title: 'DataCamp — WhatsApp 远程控制电脑', desc: 'WhatsApp 远程控制实操教程，含 Skill 开发', url: 'https://www.datacamp.com/tutorial/moltbot-clawdbot-tutorial', source: 'DataCamp', category: 'getting-started', tags: ['WhatsApp', 'Skill'] },

    // ============ Channel Integration ============
    { title: '保姆级飞书对接教程 — 手把手搭建 AI 助手', desc: 'Linux 下安装 OpenClaw 并对接飞书机器人', url: 'https://www.cnblogs.com/catchadmin/p/19556552', source: '博客园', category: 'channel-integration', tags: ['飞书', '保姆级'] },
    { title: '飞书对接教程 — CSDN 版', desc: '详细的 OpenClaw 飞书机器人配置指南', url: 'https://blog.csdn.net/qq_31470439/article/details/157578441', source: 'CSDN', category: 'channel-integration', tags: ['飞书', 'CSDN'] },
    { title: 'MiniMax — Build AI Assistant on Telegram', desc: 'Connect MiniMax M2.1 to Telegram via OpenClaw', url: 'https://platform.minimax.io/docs/solutions/moltbot', source: 'MiniMax', category: 'channel-integration', tags: ['Telegram', 'MiniMax'] },

    // ============ Skill Development ============
    { title: 'ClawHub 技能开发文档', desc: '如何创建、发布和管理自定义技能', url: 'https://docs.openclaw.ai/tools/clawhub', source: 'OpenClaw Docs', category: 'skill-dev', tags: ['技能', '开发'] },
    { title: 'OpenClaw Skills 在 Claude Code 中使用', desc: 'Reddit 分享：在 Claude Code 中运行 OpenClaw 提示词和技能', url: 'https://www.reddit.com/r/ClaudeAI/comments/1qs49hw/', source: 'Reddit', category: 'skill-dev', tags: ['Claude Code'] },
    { title: 'ClawHub Skill Directory 源码', desc: 'ClawHub GitHub 仓库，了解技能目录结构', url: 'https://github.com/openclaw/clawhub', source: 'GitHub', category: 'skill-dev', tags: ['源码', '参考'] },
    { title: 'Apiyi — OpenClaw 扩展生态全解析', desc: '700+ Skills 库、12 大平台集成总览', url: 'https://help.apiyi.com/en/openclaw-extensions-ecosystem-guide-en.html', source: 'Apiyi', category: 'skill-dev', tags: ['生态', '集成'] },

    // ============ Video Tutorials ============
    { title: 'OpenClaw 海量全玩法攻略 — 国内网络使用 + 本地部署', desc: 'B站详细视频教程，涵盖所有主要功能和配置', url: 'https://www.bilibili.com/video/BV1kH6nBFEPq/', source: 'Bilibili', category: 'video', tags: ['B站', '全面'] },
    { title: 'B站 — OpenClaw 架构全解析', desc: 'Skills/MCP/RAG/Memory/AI Agent 概念拆解', url: 'https://www.bilibili.com/video/BV1Bm6bB5EJ3/', source: 'Bilibili', category: 'video', tags: ['B站', '架构', 'MCP'] },
    { title: 'B站 — 为什么能记住你说过的话？AI 记忆系统拆解', desc: '深入分析记忆机制：日记文件、长期记忆、上下文管理', url: 'https://www.bilibili.com/video/BV1fv61B4EQ5/', source: 'Bilibili', category: 'video', tags: ['记忆系统', '深度'] },
    { title: 'B站 — OpenClaw 爆火 AI 自动化神器！', desc: '零度解说出品，本地部署 + 聊天软件对接', url: 'https://www.bilibili.com/video/BV1vz6nBmEA3/', source: 'Bilibili', category: 'video', tags: ['零度解说', '部署'] },
    { title: 'YouTube — OpenClaw Tutorial For Beginners (2026)', desc: '英文入门视频，安装到自动化任务演示', url: 'https://www.youtube.com/watch?v=Gc4fyY0_8Rc', source: 'YouTube', category: 'video', tags: ['YouTube', '英文'] },

    // ============ Deep Dive Articles ============
    { title: '知乎 — 一文读懂 OpenClaw 分析与教程', desc: '完整目录结构解析：AGENTS.md / SOUL.md / MEMORY.md / Skills 全拆解', url: 'https://zhuanlan.zhihu.com/p/2000850539936765122', source: '知乎', category: 'deep-dive', tags: ['架构', '目录结构'] },
    { title: '飞书官方 — 完全搞懂 Clawd Bot + 飞书对接', desc: 'Gateway-Node 架构深度解析、Canvas 画布、成本分析', url: 'https://www.feishu.cn/content/article/7602519239445974205', source: '飞书官网', category: 'deep-dive', tags: ['飞书官方', '安全'] },
    { title: 'The Hacker News — 341 个恶意技能窃取数据', desc: 'ClawHavoc 供应链攻击——用户必读安全警示', url: 'https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html', source: 'Hacker News', category: 'deep-dive', tags: ['安全', '供应链'] },
    { title: 'IBM Think — OpenClaw 架构创新分析', desc: 'IBM 深度分析垂直集成策略', url: 'https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration', source: 'IBM', category: 'deep-dive', tags: ['IBM', '深度'] },
    { title: 'Scientific American — OpenClaw 改变数字助理', desc: '这个开源Agent真的能替你操作电脑', url: 'https://www.scientificamerican.com/article/moltbot-is-an-open-source-ai-agent-that-runs-your-computer/', source: 'Scientific American', category: 'deep-dive', tags: ['科普', '主流媒体'] },
    { title: 'Cisco — 个人 AI Agent 是安全噩梦', desc: '思科安全团队分析开源 AI Agent 风险', url: 'https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare', source: 'Cisco', category: 'deep-dive', tags: ['安全', '企业'] },
    { title: 'DEV Community — 开发者终极指南', desc: 'Gateway 架构、Brain 模型层、Skill 编写全解析', url: 'https://dev.to/mechcloud_academy/unleashing-openclaw-the-ultimate-guide-to-local-ai-agents-for-developers-in-2026-3k0h', source: 'DEV', category: 'deep-dive', tags: ['架构', 'Skill开发'] },
    { title: 'Medium — 驾驭 OpenClaw 的正确姿势', desc: '工作流设计、提示词策略和安全边界', url: 'https://medium.com/activated-thinker/stop-watching-openclaw-install-tutorials-this-is-how-you-actually-tame-it-f3416f5d80bc', source: 'Medium', category: 'deep-dive', tags: ['进阶', '工作流'] },

    // ============ Tools & Plugins ============
    { title: 'ClawdBot 一键部署工具', desc: 'Mac/Linux 一键安装脚本，自动化环境配置', url: 'https://github.com/miaoxworld/ClawdBotInstaller', source: 'GitHub', category: 'tools', tags: ['一键', '脚本'] },
    { title: 'Clawdbot 中文文档', desc: '社区翻译的中文 README 和使用指南', url: 'https://github.com/bbylw/clawdbot-cn', source: 'GitHub', category: 'tools', tags: ['中文', '文档'] },
    { title: 'OpenClaw 汉化版 — CLI + Dashboard 全中文', desc: '每小时同步官方仓库，含完整中文 README', url: 'https://github.com/1186258278/OpenClawChineseTranslation', source: 'GitHub', category: 'tools', tags: ['汉化', '中文'] },

    // ============ Use Cases ============
    { title: 'AIML API — 真实自动化使用指南', desc: '连接邮件、文件、网站和 API 进行实际任务执行', url: 'https://aimlapi.com/blog/openclaw-full-tutorial-installation-setup-real-automation-use-step-by-step', source: 'AIML API', category: 'use-cases', tags: ['自动化', 'API'] },
    { title: 'Medium — Home Assistant 智能家居集成', desc: '将 OpenClaw 接入智能家居系统实现家庭自动化', url: 'https://medium.com/@gemQueenx/what-is-openclaw-open-source-ai-agent-in-2026-setup-features-8e020db20e5e', source: 'Medium', category: 'use-cases', tags: ['智能家居', '隐私'] },
];
