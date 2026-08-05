# Multi-stage build: dependencies → build → runtime
FROM node:20-alpine AS deps
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod=false

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build --filter=web-replycontrol

# Production runtime
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["pnpm", "start"]

# Development stage (for docker-compose dev)
FROM node:20-alpine AS development
WORKDIR /app
ENV NODE_ENV=development
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
EXPOSE 3000
CMD ["pnpm", "dev"]
