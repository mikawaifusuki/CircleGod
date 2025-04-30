# CircleGod

CircleGod 是一个现代化的数据可视化与分析平台，集成了先进的 MetaGPT 智能体系统，旨在帮助用户轻松创建、管理和分享数据仪表盘，实现 AI 驱动的数据决策。

##  MetaGPT 智能体系统

CircleGod 的核心优势在于集成了强大的 MetaGPT 智能体系统，提供了一套完整的 AI 驱动能力：

###  AI 智能体架构

- **灵活的智能体工厂**
  - 基于 AgentFactory 的智能体创建与管理
  - 支持多种专业化智能体类型
  - 智能体间无缝协作

- **专业化智能体**
  - **ChatAgent**: 提供自然语言交互界面，理解用户需求
  - **DataAnalystAgent**: 执行数据分析，发现趋势、检测异常、生成业务洞察
  - **VisualizerAgent**: 自动生成最佳可视化方案，优化数据展示
  - **DataConnectorAgent**: 处理数据源连接与转换
  - **PredictorAgent**: 执行预测分析，拟合模型与时间序列预测

- **独特优势**
  - 基于大语言模型的上下文理解
  - 可扩展的智能体能力与动作系统
  - 记忆系统支持对话历史与长期知识

##  核心功能

###  数据连接器
- 支持 MySQL、PostgreSQL、MongoDB、REST API、GraphQL、CSV、Excel
- 可视化配置界面，AI 辅助连接配置
- 自动连接测试与数据同步调度
- AI 驱动的数据清洗与转换

###  AI 驱动分析
- **自动化数据探索**
  - 智能识别关键模式与趋势
  - 异常检测与根因分析
  - 相关性发现与特征重要性评估
- **高级分析模型**
  - 机器学习：回归、分类、聚类、时间序列
  - 自然语言处理与计算机视觉集成
  - 模型训练、评估与解释

###  智能可视化仪表盘
- **AI 辅助设计**
  - 基于数据智能推荐最佳可视化
  - 自动布局优化
  - 数据故事化呈现
- **交互式设计**
  - 拖拽式布局
  - 响应式设计
  - 实时数据更新
- **丰富组件库**
  - 图表组件
  - 数据表格
  - 指标卡片
  - 地图可视化
  - 文本组件
  - 过滤器组件

###  智能报表系统
- 多格式导出：PDF、Excel、CSV
- AI 辅助报表生成与解释
- 定时导出与自动发送
- 任务管理

##  快速开始

### 环境要求
- Node.js 18+
- PostgreSQL 14+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/mikawaifusuki/CircleGod.git
   cd CircleGod
   ```

2. **安装依赖**
   ```bash
   # 全部依赖
   npm install
   
   # 或者分步安装
   # 核心依赖
   npm install next@latest react@latest react-dom@latest
   
   # 数据库和认证
   npm install @prisma/client next-auth bcryptjs
   
   # UI 组件
   npm install tailwindcss@latest postcss@latest autoprefixer@latest react-icons
   
   # 数据可视化
   npm install chart.js d3.js react-grid-layout
   
   # AI 和 LLM 集成
   npm install openai langchain
   
   # 报表导出
   npm install jspdf jspdf-autotable xlsx csv-stringify
   
   # 开发依赖
   npm install --save-dev typescript @types/node @types/react @types/react-dom prisma
   ```

3. **配置环境**
   ```bash
   cp .env.example .env
   ```
   编辑 `.env` 文件，配置：
   - 数据库连接信息
   - NextAuth 配置
   - OpenAI API 密钥
   - 其他必要的 API 密钥

4. **初始化数据库**
   ```bash
   npx prisma migrate dev
   ```

5. **启动开发服务器**
   ```bash
   npm run dev
   ```

6. **访问应用**
   打开浏览器访问 http://localhost:3000

##  技术栈

### 前端技术栈
- **框架**: Next.js 14, React 18
- **UI**: Tailwind CSS, React Icons
- **状态管理**: React Context
- **可视化**: Chart.js, D3.js
- **导出功能**: jsPDF, xlsx, csv-stringify

### 后端技术栈
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **认证**: NextAuth.js
- **API**: Next.js API Routes

### AI 技术栈
- **大语言模型**: OpenAI API 集成
- **智能体框架**: 自研 MetaGPT 架构
- **可视化推荐**: 基于数据特征的智能推荐系统
- **预测分析**: 时间序列与机器学习模型

##  文档

- [架构设计](./docs/architecture.md)
- [API 文档](./docs/api.md)
- [开发规范](./docs/development.md)
- [部署指南](./docs/deployment.md)
- [MetaGPT 集成指南](./docs/metagpt.md)

##  参与贡献

我们欢迎各种形式的贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何参与项目开发。

### 贡献流程
1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 发起 Pull Request

##  许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

##  更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解项目的版本更新历史。 
