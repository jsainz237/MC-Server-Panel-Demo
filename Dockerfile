FROM node:10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install --silent
RUN cd client && yarn install --silent

EXPOSE 5000

# You can change this
CMD [ "npm", "start" ]