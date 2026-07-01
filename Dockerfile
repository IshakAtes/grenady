# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
ARG VITE_BASE_PATH=/
ENV VITE_BASE_PATH=$VITE_BASE_PATH
COPY . .
RUN npm run lint
RUN npm run build

FROM node:24-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

RUN addgroup -S grenady && adduser -S grenady -G grenady

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build --chown=grenady:grenady /app/dist ./dist
COPY --from=build --chown=grenady:grenady /app/server ./server

USER grenady
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/healthz').then((res) => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["npm", "run", "start"]
