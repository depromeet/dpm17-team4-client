# Use the official Node.js 20 image as the base image
FROM node:20-alpine AS base

# Install dependencies and build
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable corepack for Yarn 4.x support
RUN corepack enable

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN corepack enable yarn && yarn install --frozen-lockfile

# Copy source code
COPY . .

# Reinstall dependencies (needed after copying source code)
RUN corepack enable yarn && yarn install --frozen-lockfile

# Build the application
RUN corepack enable yarn && yarn build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create public directory (Next.js will handle it)
RUN mkdir -p public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]