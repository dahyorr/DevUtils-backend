FROM node:lts-slim
EXPOSE 3000

WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH

# nest file watcher breaks without it
RUN apt-get update && apt-get install -y procps

COPY ./package*.json ./
RUN npm install
COPY . .
RUN mkdir /uploads
RUN chown node /uploads
CMD [ "npm", "run", "start:dev" ]     