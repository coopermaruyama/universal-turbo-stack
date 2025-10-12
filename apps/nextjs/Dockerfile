# syntax=docker/dockerfile:1

# ========== Build Arguments ==========
ARG NODE_VERSION=22.14.0
ARG PNPM_VERSION=10.15.1

# ========== Base Stage ==========
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory
WORKDIR /app

# ========== Builder (prune) ==========
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Enable pnpm via corepack and install turbo globally (pin to major v2)
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN pnpm add -g turbo@^2
# Copy repo and prune to target workspace (@acme/nextjs)
COPY . .
RUN turbo prune @acme/nextjs --docker

# ========== Installer (install + build) ==========
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY .env* .
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1
RUN echo "NODE_ENV=${NODE_ENV}"
RUN pnpm turbo run build --filter=@acme/nextjs

# ========== Runner ==========
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

# Runtime deps
RUN apk add --no-cache libc6-compat curl bash sops age

# Enable pnpm in runtime and set non-root install locations
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
ENV PNPM_HOME="/home/nextjs/.local/share/pnpm"
ENV PNPM_STORE_DIR="/home/nextjs/.pnpm-store"
ENV NPM_CONFIG_PREFIX="/home/nextjs/.npm-global"
ENV PATH="/home/nextjs/.npm-global/bin:$PNPM_HOME:$PATH"
RUN mkdir -p /home/nextjs/.local/share/pnpm /home/nextjs/.pnpm-store /home/nextjs/.npm-global

# Optional: tools used by start.sh
# Using nix/flox or local install for extras; keep minimal
RUN npm install -g drizzle-kit

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Ensure nextjs owns its global dirs
RUN chown -R 1001:1001 /home/nextjs/.local /home/nextjs/.pnpm-store /home/nextjs/.npm-global
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/.next/static ./apps/nextjs/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/public ./apps/nextjs/public

# Copy database package if needed at runtime (e.g., migrations)
COPY --from=installer --chown=nextjs:nodejs /app/packages/db ./packages/db

# Optionally include production env files from app workspace
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/.env.production* ./

# Start script
COPY --chown=nextjs:nodejs --chmod=0755 apps/nextjs/start.sh ./start.sh

# Runtime environment
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["/app/start.sh"]
