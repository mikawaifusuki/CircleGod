# CircleGod

正在开发中 | Under active development

CircleGod 是一个现代化的数据可视化与分析平台，旨在帮助用户轻松创建、管理和分享数据仪表盘，实现数据驱动的决策。
当前的核心开发方向是整合高效的 AI Agent 框架，以实现智能化、自动化的数据处理。

##  核心功能

###  数据连接器
- 支持 MySQL、PostgreSQL、MongoDB、REST API、GraphQL、CSV、Excel
- 可视化配置界面
- 自动连接测试
- 数据同步调度

###  高级分析模型
- 机器学习：回归、分类、聚类、时间序列
- AI能力：NLP、计算机视觉、智能洞察
- 模型训练与评估
- 预测结果可视化

###  可视化仪表盘
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

### 📑 报表系统
- 多格式导出：PDF、Excel、CSV
- 定时导出
- 自动发送
- 任务管理

  CircleGod界面示例
![Image](https://github.com/user-attachments/assets/fb3b7ad4-495e-4d65-88ae-c07ee40ec03c)


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
   # 核心依赖
   npm install next@latest react@latest react-dom@latest
   
   # 数据库和认证
   npm install @prisma/client next-auth bcryptjs
   
   # UI 组件
   npm install tailwindcss@latest postcss@latest autoprefixer@latest react-icons
   
   # 数据可视化
   npm install chart.js d3.js react-grid-layout
   
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

##  文档

- [架构设计](./docs/architecture.md)
- [API 文档](./docs/api.md)
- [开发规范](./docs/development.md)
- [部署指南](./docs/deployment.md)

##  参与贡献

我们欢迎各种形式的贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何参与项目开发。

### 贡献流程
1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 发起 Pull Request

##  许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。
