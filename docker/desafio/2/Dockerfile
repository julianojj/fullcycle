FROM node:23.1.0-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --frozen-lockefile
COPY . .
EXPOSE 3000
CMD ["node", "main.mjs"]
