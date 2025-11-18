FROM node:24-slim AS builder
RUN ln -sf /usr/share/zoneinfo/Europe/Berlin /etc/timezone
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
ARG GITHUB_REF_NAME=unknown
ARG GITHUB_SHA=
ARG GITHUB_RELEASE_VERSION=
ARG BUILD_DATE=
ENV PUBLIC_GITHUB_REF_NAME=$GITHUB_REF_NAME
ENV PUBLIC_GITHUB_SHA=$GITHUB_SHA
ENV PUBLIC_GITHUB_RELEASE_VERSION=$GITHUB_RELEASE_VERSION
ENV PUBLIC_BUILD_DATE=$BUILD_DATE
RUN npm run build
RUN npm prune --omit dev

FROM node:24-slim
RUN ln -sf /usr/share/zoneinfo/Europe/Berlin /etc/timezone
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]

