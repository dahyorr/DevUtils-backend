FROM node:lts-alpine as base

WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH

COPY ./package*.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN mkdir /uploads
RUN chown node /uploads

RUN npm run build
ENV NODE_ENV=production
CMD [ "npm", "run", "start:prod" ]

