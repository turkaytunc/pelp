FROM mhart/alpine-node:latest
ENV NODE_ENV=production
WORKDIR /usr/app/api
COPY ["package.json", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "start", "dev"]