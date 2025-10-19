FROM node:latest AS base

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json /temp/dev/
RUN cd /temp/dev \
   && npm i --frozen-lockfile

FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN npm run build

USER bun
CMD ["npm", "run", "start"]