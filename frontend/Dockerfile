FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

COPY static ./static
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY tsconfig.json .
COPY svelte.config.js .
COPY vite.config.ts .

FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --prod --frozen-lockfile

FROM base AS builder
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile
COPY src ./src
RUN pnpm build

FROM base AS runner

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

ENV PORT=3001
ENV ORIGIN=https://example.com

EXPOSE 3001
CMD ["node", "build/index.js"]
