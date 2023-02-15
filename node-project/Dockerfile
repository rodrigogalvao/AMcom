FROM node:10

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN npm install express redis

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 8080

CMD [ "node", "app.js" ]
