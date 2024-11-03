FROM node:23-alpine3.19

RUN mkdir -p /home/node/app/node_modules /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]
