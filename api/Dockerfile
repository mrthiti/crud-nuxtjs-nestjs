FROM node:14.7-slim

COPY . /app
WORKDIR /app

RUN npm install --verbose

RUN npm run build

EXPOSE 9000

ENTRYPOINT [ "/usr/local/bin/npm", "run", "start:prod" ]