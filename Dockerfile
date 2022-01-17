FROM node:lts-slim
EXPOSE 3000

WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH

COPY ./package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start:dev" ]     