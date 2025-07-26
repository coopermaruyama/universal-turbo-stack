# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=24.3.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential

# Install node modules
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
# COPY --link package.json pnpm-lock.yaml ./

# Copy application code
COPY --link . .

# Build application
RUN pnpm install --frozen-lockfile
ARG DOTENV_PRIVATE_KEY_PRODUCTION
ENV DOTENV_PRIVATE_KEY_PRODUCTION=${DOTENV_PRIVATE_KEY_PRODUCTION}
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --production


# Final stage for app image
FROM base

# Copy built application
# COPY --from=build /apps/nextjs /app
COPY --from=build /app/apps/nextjs/.next/standalone /app
COPY --from=build /app/apps/nextjs/.next/static /app/apps/nextjs/.next/static
COPY --from=build /app/apps/nextjs/public /app/apps/nextjs/public
COPY --from=build /app/packages/db /app/packages/db
COPY --from=build /app/apps/nextjs/.env.production /app/.env.production
COPY --from=build /app/apps/nextjs/start.sh /app/start.sh

RUN npm install -g @dotenvx/dotenvx

RUN chmod +x /app/start.sh

# listen on port 3000
EXPOSE 3000

WORKDIR /app

# Start the server by default, this can be overwritten at runtime
CMD ["/app/start.sh"]
