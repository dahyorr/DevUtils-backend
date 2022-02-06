FROM node:lts-slim as base

WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH

# nest file watcher breaks without it
RUN apt-get update && apt-get install -y --no-install-recommends procps
RUN rm -rf /var/lib/apt/lists/*

COPY ./package*.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN mkdir /uploads
RUN chown node /uploads

FROM base as dev
ENV NODE_ENV=development
EXPOSE 5000
CMD [ "npm", "run", "start:dev" ]

# FROM base as test
# ENV NODE_ENV=test
# CMD [ "npm", "run", "start:dev" ]  

FROM base as builder
RUN npm run build

FROM builder as production
ENV NODE_ENV=production
EXPOSE 5000
CMD [ "npm", "run", "start:prod" ]
