// 转换自 openclaw101 的资源数据
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
    { title: 'GitHub — openclaw/openclaw', desc: '源代码、Issue 跟踪和社区贡献指南', url: 'https://github.com/openclaw/openclaw', source: 'GitHub', category: 'official', tags: ['源码', '开源'] },
    { title: 'ClawHub 技能市场', desc: '发现、安装和分享 AI 技能插件', url: 'https://clawhub.com', source: 'ClawHub', category: 'official', tags: ['技能', '市场'] },

    // ============ Cloud Deploy ============
    { title: '阿里云 — 部署 OpenClaw 构建钉钉 AI 助理', desc: '轻量应用服务器一键部署，可视化配置面板接入钉钉', url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw', source: '阿里云', category: 'cloud-deploy', tags: ['阿里云', '钉钉', '一键'] },
    { title: '腾讯云 — OpenClaw 接入飞书保姆级教程', desc: 'Lighthouse 一键部署 + 飞书机器人全流程配置', url: 'https://cloud.tencent.com/developer/article/2625073', source: '腾讯云', category: 'cloud-deploy', tags: ['腾讯云', '飞书'] },
    { title: 'DigitalOcean — One-Click Deploy OpenClaw', desc: 'Learn how to deploy OpenClaw using DigitalOcean 1-Click solution', url: 'https://www.digitalocean.com/community/tutorials/how-to-run-openclaw', source: 'DigitalOcean', category: 'cloud-deploy', tags: ['DigitalOcean'] },

    // ============ Getting Started ============
    { title: '小白零基础教程 — 安装 OpenClaw', desc: '零基础也能看懂，Telegram 连接详细步骤', url: 'https://www.cnblogs.com/gyc567/p/19561281', source: '博客园', category: 'getting-started', tags: ['零基础', 'Telegram'] },
    { title: '怎么用上一夜爆火的 Clawdbot — 详细配置教程', desc: '实测踩了三个大坑，分享避坑指南', url: 'https://news.qq.com/rain/a/20260127A05EEN00', source: '腾讯新闻', category: 'getting-started', tags: ['避坑', '实测'] },
    { title: 'Openclaw 安装部署一文详解 + 国产平替方案', desc: '产品介绍、官网资源、本地/云端部署四维度全面解析', url: 'https://www.ai-indeed.com/article/15272.html', source: '实在智能', category: 'getting-started', tags: ['全面', '平替'] },
    { title: 'Full Tutorial: Set Up Your 24/7 AI Employee', desc: 'From zero to a running AI agent in 20 minutes flat', url: 'https://creatoreconomy.so/p/full-tutorial-set-up-your-247-ai-employee-clawd-molt', source: 'Creator Economy', category: 'getting-started', tags: ['快速', '20分钟'] },

    // ============ Channel Integration ============
    { title: '保姆级飞书对接教程 — 手把手搭建 AI 助手', desc: 'Linux 下安装 OpenClaw 并对接飞书机器人，打造专属智能助理', url: 'https://www.cnblogs.com/catchadmin/p/19556552', source: '博客园', category: 'channel-integration', tags: ['飞书', '保姆级'] },
    { title: 'MiniMax — Build AI Assistant on Telegram', desc: 'Connect MiniMax M2.1 to Telegram via OpenClaw', url: 'https://platform.minimax.io/docs/solutions/moltbot', source: 'MiniMax', category: 'channel-integration', tags: ['Telegram', 'MiniMax'] },

    // ============ Skill Development ============
    { title: 'ClawHub 技能开发文档', desc: '如何创建、发布和管理自定义技能', url: 'https://docs.openclaw.ai/tools/clawhub', source: 'OpenClaw Docs', category: 'skill-dev', tags: ['技能', '开发'] },
    { title: 'Apiyi — OpenClaw 扩展生态全解析', desc: '700+ Skills 库、12 大平台集成总览，ClawHub 技能商店使用指南', url: 'https://help.apiyi.com/en/openclaw-extensions-ecosystem-guide-en.html', source: 'Apiyi', category: 'skill-dev', tags: ['生态', '集成'] },

    // ============ Video Tutorials ============
    { title: 'OpenClaw 海量全玩法攻略 — 国内网络使用 + 本地部署', desc: 'B站详细视频教程，涵盖所有主要功能和配置', url: 'https://www.bilibili.com/video/BV1kH6nBFEPq/', source: 'Bilibili', category: 'video', tags: ['B站', '全面'] },
    { title: 'B站 — Clawdbot 为什么能记住你说过的话？AI 记忆系统拆解', desc: '深入分析 OpenClaw 的记忆机制：日记文件、长期记忆、上下文窗口管理', url: 'https://www.bilibili.com/video/BV1fv61B4EQ5/', source: 'Bilibili', category: 'video', tags: ['架构科普', '记忆系统'] },
    { title: 'B站 — OpenClaw 爆火 AI 自动化神器！', desc: '零度解说出品，本地部署 + 聊天软件对接全流程演示', url: 'https://www.bilibili.com/video/BV1vz6nBmEA3/', source: 'Bilibili', category: 'video', tags: ['零度解说', '部署'] },

    // ============ Deep Dive Articles ============
    { title: '一文读懂 OpenClaw 分析与教程', desc: '完整目录结构解析：AGENTS.md / SOUL.md / MEMORY.md / Skills 全拆解', url: 'https://zhuanlan.zhihu.com/p/2000850539936765122', source: '知乎', category: 'deep-dive', tags: ['架构', '目录结构'] },
    { title: 'The Hacker News — 341 个恶意 ClawHub 技能窃取用户数据', desc: 'Koi Security 审计发现 ClawHavoc 供应链攻击，OpenClaw 用户必读安全警示', url: 'https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html', source: 'Hacker News', category: 'deep-dive', tags: ['安全', '供应链攻击'] },
    { title: '飞书官方 — 一文完全搞懂 Clawd Bot 附飞书对接指南', desc: '来自飞书安全团队，Gateway-Node 架构深度解析、Canvas 画布、部署方案与成本分析', url: 'https://www.feishu.cn/content/article/7602519239445974205', source: '飞书官网', category: 'deep-dive', tags: ['飞书官方', '安全'] },

    // ============ Tools & Plugins ============
    { title: 'ClawdBot 一键部署工具', desc: 'Mac/Linux 一键安装脚本，自动化环境配置', url: 'https://github.com/miaoxworld/ClawdBotInstaller', source: 'GitHub', category: 'tools', tags: ['一键', '脚本'] },
    { title: 'OpenClaw 汉化版 — CLI + Dashboard 全中文', desc: '每小时自动同步官方仓库，含完整中文 README、全流程搭建教程', url: 'https://github.com/1186258278/OpenClawChineseTranslation', source: 'GitHub', category: 'tools', tags: ['汉化', '中文'] }
];
