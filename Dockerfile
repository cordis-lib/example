FROM node:15-alpine
LABEL name "example bot"

WORKDIR /usr/bot

RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps curl

RUN curl -L https://unpkg.com/@pnpm/self-installer | node && apk del .build-deps

COPY package.json pnpm-lock.yaml tsconfig.json ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm run build && pnpm prune --prod

CMD ["node", "--enable-source-maps", "./dist/index.js"]
