# Multi-stage Dockerfile for Next.js + Prisma
# 1) deps: install node_modules
# 2) builder: build Next.js app & generate Prisma client
# 3) production: run with minimal size, apply migrations on start

FROM node:20-alpine AS deps
WORKDIR /app
# Install system deps if needed (e.g., openssl for Prisma). Alpine already has.
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm ci --ignore-scripts

FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate Prisma Client
RUN npx prisma generate
# Build Next.js (output stored in .next)
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
# Copy only necessary runtime files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.mjs ./next.config.mjs
# Expose port
EXPOSE 3000
# Run migrations then start app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
