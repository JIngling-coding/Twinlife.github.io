# Twinlife

Twinlife是一个基于Next.js和腾讯云的全栈应用，采用前后端分离架构。

## 项目结构

```
Twinlife.github.io/
├── packages/
│   ├── core-logic/   # 可复用的业务逻辑
│   │   ├── src/
│   │   │   ├── auth/  # 认证相关功能
│   │   │   └── index.ts
│   │   └── package.json
│   └── twinlife-api/  # 统一API调用封装
│       ├── src/
│       │   └── index.ts
│       └── package.json
├── web/              # 网站前端
│   ├── src/
│   │   ├── api/      # API客户端实例
│   │   └── ...
│   └── package.json
└── package.json      # 工作区配置
```

## 技术栈

### 前端
- Next.js 15.1.0
- React 19
- TypeScript
- Radix UI + Tailwind CSS
- Zustand + Immer

### 后端
- 腾讯云函数（SCF）
- Express.js
- MySQL
- JWT认证

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## 部署

### 前端
前端静态文件部署在腾讯云对象存储（COS）上。

### 后端
后端API部署在腾讯云函数（SCF）上，通过HTTP触发器暴露API端点。

### 数据库
用户数据存储在腾讯云数据库MySQL中。

## 功能模块

- 生活管理
- 能量管理
- 行动管理
- 情感管理
- 知识管理
- 大脑管理
- 公司管理
- 个人管理
- 日常管理
- 复盘管理
- 创建管理
- 设置

## 本地开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署

### GitHub Pages 部署

项目使用GitHub Actions自动部署到GitHub Pages。每次推送到main分支时，都会触发部署工作流程。

```bash
# 将更改推送到main分支
git add .
git commit -m "您的提交信息"
git push origin main
```

部署完成后，您可以在GitHub仓库的"Actions"标签页查看部署状态。部署成功后，网站将在 `https://<您的GitHub用户名>.github.io/Twinlife.github.io/` 可访问。

#### 部署配置说明

项目已配置为静态导出模式，适合GitHub Pages部署：

1. **next.config.mjs配置**：
   - `output: 'export'` - 启用静态HTML导出
   - `basePath` 和 `assetPrefix` - 配置为仓库名，确保资源路径正确
   - `images.unoptimized: true` - 允许图片在静态导出中使用

2. **GitHub Actions工作流**：
   - 自动构建Next.js应用
   - 创建`.nojekyll`文件，防止GitHub Pages使用Jekyll处理文件
   - 将构建产物上传并部署到GitHub Pages

### Docker 部署

项目包含Dockerfile，可以在任何支持Docker的环境中部署：

```bash
# 构建Docker镜像
docker build -t twinlife-app .

# 运行Docker容器
docker run -p 3000:3000 twinlife-app
```

### 其他部署选项

项目也可以部署到Vercel或Netlify等平台，这些平台对Next.js提供了优化的支持。

## 项目状态

当前版本: v0.1.0

- [x] 基础框架搭建
- [x] UI组件库集成
- [x] 部署配置
- [x] GitHub Pages静态导出配置
- [ ] 核心功能实现
- [ ] 数据持久化
- [ ] 用户认证

## 许可证

MIT 