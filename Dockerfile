FROM node:16
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV production
RUN npm install
RUN npm run build
CMD [ "npm", "run","start"]
EXPOSE 8801
