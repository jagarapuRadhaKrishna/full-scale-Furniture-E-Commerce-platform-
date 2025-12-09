# 🐳 Production Docker Configuration for DFW Furniture World
# Multi-stage build for optimized production image

# ================================
# Stage 1: Dependencies
# ================================
FROM node:18-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# ================================
# Stage 2: Builder
# ================================
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Build arguments
ARG NODE_ENV=production
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_API_URL

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Generate Prisma client and build application
RUN npx prisma generate
RUN npm run build

# ================================
# Stage 3: Production Runtime
# ================================
FROM node:18-alpine AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install runtime dependencies
RUN apk add --no-cache dumb-init

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy built Next.js application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma files
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Set up environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expose port
EXPOSE 3000

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]