# 使用 Node.js 镜像作为基础镜像
FROM node:14.17.0 as builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN  npm ci

# 复制应用程序的源代码
COPY . .

# 构建前端应用
RUN npm run build:prod

# 使用 Nginx 镜像作为最终镜像
FROM nginx:1.21.3

# 复制构建好的静态文件到 Nginx 的默认目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露容器的端口（默认为 80）
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]