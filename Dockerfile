FROM node:16

ENV NAME=films
ENV APP_WORKDIR=/usr/src/$NAME/

COPY package.json $APP_WORKDIR
WORKDIR $APP_WORKDIR

RUN npm i
COPY . $APP_WORKDIR

EXPOSE 8000
CMD npm run migrate
CMD npm run start:dev
