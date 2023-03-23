FROM node:alpine
WORKDIR /app
ADD package.*json ./app
RUN npm install
ADD . .
EXPOSE 3500
CMD ["npm", "start"]