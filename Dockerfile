FROM node:16
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV production
RUN npm install pm2 -g && npm install --production
CMD [ "pm2", "restart","pm2.json"  ]
EXPOSE 8801
