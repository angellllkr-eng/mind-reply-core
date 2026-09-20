# NOVA Gaming Frontend — Multi-stage Dockerfile (Vercel deployment)
# Build: Next.js 16 + React 19
# Target: Production-ready Node.js container (optional self-hosted fallback to Vercel)

FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Install pnpm (or use npm as fallback)
RUN npm install -g pnpm@latest

# Stage 1: Install dependencies
FROM base AS deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build application
FROM base AS builder
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .

# Build with environment variables (can be overridden at runtime)
ARG NEXT_PUBLIC_MARKET=UK
ARG NEXT_PUBLIC_CURRENCY=GBP
ARG NEXT_PUBLIC_API_URL=http://localhost:3001

ENV NEXT_PUBLIC_MARKET=$NEXT_PUBLIC_MARKET
ENV NEXT_PUBLIC_CURRENCY=$NEXT_PUBLIC_CURRENCY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm run build

# Stage 3: Production runtime
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["node", "server.js"]
