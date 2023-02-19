FROM node:18-slim
RUN npm install -g pnpm

WORKDIR /web
COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY . .
RUN pnpm install --offline

EXPOSE 5173