FROM oven/bun:latest AS base

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock* /temp/dev/
RUN cd /temp/dev \
   && bun i --frozen-lockfile --production

FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

USER bun
CMD ["bun", "run", "start"]