FROM node:18-alpine AS builder
WORKDIR /app
RUN yarn set version berry
COPY --chown=node:node .yarn .yarn
COPY --chown=node:node .pnp.cjs .yarnrc.yml package.json yarn.lock ./
RUN yarn install --immutable 
COPY --chown=node:node . .
RUN yarn build
# remove development dependencies
# https://gitlab.com/Larry1123/yarn-contrib/-/tree/master/packages/plugin-production-install
RUN yarn prod-install build
RUN cp -r dist build/dist

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV="production"
COPY --chown=node:node --from=builder /app/.env .env
COPY --chown=node:node --from=builder /app/build .
USER node
CMD ["node", "-r", "./.pnp.cjs", "dist/main"]