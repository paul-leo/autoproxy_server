FROM node:16
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
CMD [ "npm", "run","start"]
EXPOSE 8801
