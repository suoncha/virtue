FROM node:18-alpine AS builder
WORKDIR /app
RUN yarn set version berry
COPY --chown=node:node .yarn .yarn
COPY --chown=node:node .pnp.cjs .yarnrc.yml package.json yarn.lock ./
RUN yarn install --immutable
COPY --chown=node:node . .
RUN yarn build 

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
CMD ["nginx", "-g", "daemon off;"]