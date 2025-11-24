# 1. Base builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --immutable

# Copy source code
COPY . .

# Build
RUN yarn build

# 2. Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["yarn", "start"]
