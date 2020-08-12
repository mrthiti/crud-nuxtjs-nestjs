FROM node:14.7

COPY . /app
WORKDIR /app

RUN npm install --verbose

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

ENTRYPOINT [ "/usr/local/bin/npm", "run", "start" ]