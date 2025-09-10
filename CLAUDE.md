# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a T3 Turbo monorepo combining Next.js 15 and Expo (React Native) apps with shared packages. The project uses:

- **Turborepo** for monorepo management
- **pnpm** as package manager (requires pnpm@>=9.6.0)
- **React 19** across both apps
- **TypeScript** throughout
- **Tailwind CSS** for styling
- **tRPC** for type-safe APIs
- **Better Auth** for authentication
- **Drizzle ORM** with Supabase/PostgreSQL
- **Tamagui** for cross-platform UI components

## Development Commands

### Common Commands (run from root)

```bash
# Install dependencies
pnpm i

# Start all apps in dev mode
pnpm dev

# Start only Next.js app
pnpm dev:next

# Build all apps
pnpm build

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Fix formatting
pnpm format:fix

# Type checking
pnpm typecheck

# Database operations
pnpm db:push      # Push schema changes
pnpm db:studio    # Open database studio

# Add UI components
pnpm ui-add

# Clean workspaces
pnpm clean:workspaces
```

### Next.js App Commands (from apps/nextjs)

```bash
# Development with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm typecheck

# Add shadcn/ui components
pnpm ui-add
```

### Expo App Commands (from apps/expo)

```bash
# Start development server
pnpm dev

# Start with iOS simulator
pnpm dev:ios

# Start with Android emulator
pnpm dev:android

# Build for iOS
pnpm ios

# Build for Android
pnpm android

# Add React Native Reusables components
pnpm ui-add
```

## Architecture Overview

### Monorepo Structure

```
apps/
├── expo/          # React Native app using Expo SDK 53
└── nextjs/        # Next.js 15 web app

packages/
├── api/           # tRPC API definitions and routers
├── auth/          # Better Auth configuration
├── db/            # Drizzle ORM schemas and client
├── tamagui/       # Tamagui UI components for cross-platform
├── ui/            # shadcn/ui components for web
└── validators/    # Shared Zod validation schemas

tooling/
├── tailwind/      # Shared Tailwind configurations
└── typescript/    # Shared TypeScript configurations
```

### Key Architecture Patterns

1. **Shared API Layer**: The `@acme/api` package contains tRPC routers used by both apps
2. **Cross-platform UI**: Tamagui components work across web and mobile
3. **Type Safety**: Full type safety from database to frontend using tRPC and Drizzle
4. **Authentication**: Better Auth handles OAuth (Discord, Google) and email auth
5. **Database**: Edge-ready PostgreSQL with Drizzle ORM
6. **Styling**: Tailwind CSS with NativeWind for React Native

### Environment Setup

1. Copy `.env.example` to `.env` and configure:

   - `POSTGRES_URL` - Supabase database connection
   - `AUTH_SECRET` - Generate with `openssl rand -base64 32`
   - OAuth credentials (Discord, Google)
   - Optional: SendGrid for email auth

2. Push database schema: `pnpm db:push`

### Important Notes

- The project uses experimental React 19 and may have compatibility issues
- Expo app uses SDK 53 (canary) for React 19 support
- Database is configured for edge runtime with Vercel Postgres driver
- The `@acme` namespace is used throughout - replace with your project name
- Better Auth proxy is recommended for OAuth in development/preview deployments

### Testing

The project doesn't have a specific test setup configured. Check individual packages for test scripts.

### Mobile Development

For Expo development, you need either:

- iOS: XCode and iOS Simulator
- Android: Android Studio and emulator
- Physical device with Expo Go app

Configure the dev script in `apps/expo/package.json` for your preferred platform.

## Development Guidelines

- **Web Interface Changes**:
  - If a change was made to a web interface, use the playwright mcp to check your work, or ask me to give you a screenshot as a fallback

## Playwright Best Practices

- When using Playwright:
  - Check `browser_tab_list` and `browser_tab_select` to reuse existing tabs when available
