
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm i -g serve
COPY . .
RUN npm run build
EXPOSE 6006
CMD ["npm","start"]