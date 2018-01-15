FROM node:8

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .
COPY server.js .
RUN yarn

CMD ["yarn", "start"]
