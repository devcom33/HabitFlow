FROM node:20.18.2-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#build command to create a production-ready app
RUN npm run build

RUN npm install -g serve

EXPOSE 4173

CMD ["serve", "-s", "dist"]