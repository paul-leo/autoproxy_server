FROM node:14
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install pm2 -g

EXPOSE 8801
