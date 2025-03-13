# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./
# 安装依赖
RUN npm install --legacy-peer-deps

# 复制源代码
COPY . .
# 构建应用
RUN npm run build

# 生产阶段
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# 复制构建产物
COPY --from=builder /app/out ./out
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./

# 安装生产依赖
RUN npm install --production --legacy-peer-deps

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["npm", "start"]
