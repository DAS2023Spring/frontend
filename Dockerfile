FROM node:16-alpine

WORKDIR /app

RUN yarn global add serve

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["serve", "-s", "build"]