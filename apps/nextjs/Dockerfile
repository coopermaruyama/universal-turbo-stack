# syntax=docker/dockerfile:1

# ========== Build Arguments ==========
ARG NODE_VERSION=22.14.0
ARG PNPM_VERSION=10.11.1

# ========== Base Stage ==========
FROM node:${NODE_VERSION}-alpine AS base

# Install dependencies required for node-gyp
RUN apk add --no-cache libc6-compat python3 make g++

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

# ========== Dependencies Stage ==========
FROM base AS deps

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Create directory structure and copy package.json files
COPY apps/nextjs/package.json ./apps/nextjs/
COPY apps/expo/package.json ./apps/expo/

# Copy packages
COPY packages/api/package.json ./packages/api/
COPY packages/auth/package.json ./packages/auth/
COPY packages/db/package.json ./packages/db/
COPY packages/liteapi/package.json ./packages/liteapi/
COPY packages/ui/package.json ./packages/ui/
COPY packages/validators/package.json ./packages/validators/

# Copy tooling
COPY tooling/github/package.json ./tooling/github/
COPY tooling/prettier/package.json ./tooling/prettier/
COPY tooling/tailwind/package.json ./tooling/tailwind/
COPY tooling/typescript/package.json ./tooling/typescript/

# Install dependencies
RUN pnpm install --frozen-lockfile

# ========== Builder Stage ==========
FROM base AS builder

# Copy all installed dependencies from deps stage
COPY --from=deps /app ./

# Copy source code (excluding env files that will be handled separately)
COPY . .

# Set build-time environment variables
ARG DOTENV_PRIVATE_KEY_PRODUCTION
ARG NODE_ENV="production"
ENV DOTENV_PRIVATE_KEY_PRODUCTION=${DOTENV_PRIVATE_KEY_PRODUCTION}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=${NODE_ENV}

# Build the application using dotenvx convention
WORKDIR /app/apps/nextjs
RUN npm install -g @dotenvx/dotenvx@latest
RUN echo "DEBUG: DOTENV_PRIVATE_KEY_PRODUCTION (len)=${#DOTENV_PRIVATE_KEY_PRODUCTION}"
RUN DOTENV_PRIVATE_KEY_PRODUCTION=$DOTENV_PRIVATE_KEY_PRODUCTION dotenvx run --convention=nextjs -- pnpm next build

# ========== Runner Stage ==========
FROM node:${NODE_VERSION}-alpine AS runner

# Install runtime dependencies
RUN apk add --no-cache libc6-compat curl bash

# Install dotenvx globally
RUN npm install -g @dotenvx/dotenvx@latest

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Copy production files
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextjs/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextjs/.next/static ./apps/nextjs/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextjs/public ./apps/nextjs/public

# Copy database package for migrations with its node_modules
COPY --from=builder --chown=nextjs:nodejs /app/packages/db ./packages/db

# Copy environment files if they exist
COPY --chown=nextjs:nodejs .env.production* ./

# Copy start script and set permissions
COPY apps/nextjs/start.sh ./start.sh
RUN chmod +x ./start.sh && chown nextjs:nodejs ./start.sh

# Set runtime environment
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["dotenvx", "run", "--convention=nextjs", "--", "./start.sh"]
