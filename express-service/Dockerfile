FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]
