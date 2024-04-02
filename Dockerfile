FROM node:16
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV production
RUN npm install && npm run build && rm -rf node_modules && npm install --production
CMD [ "npm", "run","start"]
EXPOSE 8801
