# AI Agent 权威指南

> 从入门到生产级落地的系统化路径。21 章，双语言（Python + TypeScript），渐进式发布。

- 📖 在线阅读：https://phoenix1983413.github.io/ai-agent-guide/
- 🗂️ 仓库：https://github.com/phoenix1983413/ai-agent-guide

## 当前进度

- ✅ Part 0 · 为什么需要了解 Agent（决策者视角）
- ✅ 第 1 章 · 什么是 AI Agent
- ✅ 第 2 章 · Agent 架构通用模式
- ✅ 第 3 章 · 记忆系统
- ✅ 第 4 章 · 工具使用与函数调用
- 🔜 第 5–21 章 · 连载中

## 目录结构

```
ai-agent-guide/
├── index.html               # 首页 / 阅读路径
├── chapters/
│   ├── part-0.html          # Part 0 · 为什么需要了解 Agent
│   ├── chapter-01.html      # 第 1 章 · 什么是 AI Agent
│   ├── chapter-02.html      # 第 2 章 · Agent 架构通用模式
│   ├── chapter-03.html      # 第 3 章 · 记忆系统
│   ├── chapter-04.html      # 第 4 章 · 工具使用与函数调用
│   └── chapter-05.html      # 第 5 章 · 规划与推理（占位）
├── assets/
│   ├── css/style.css        # 书籍主题样式
│   └── js/main.js           # 移动端侧边栏 + 代码块增强
└── _data/
    └── toc.yml              # 目录数据（未来供搜索/导航用）
```

## 本地预览

```bash
cd ai-agent-guide
python3 -m http.server 8138 --bind 127.0.0.1
# 打开 http://127.0.0.1:8138
```

## 贡献

每章末尾都有「本章产出」代码示例，欢迎提 PR 补充其他语言版本或修正勘误。

## 许可证

CC BY-NC-SA 4.0（非商用，署名，相同方式共享）
