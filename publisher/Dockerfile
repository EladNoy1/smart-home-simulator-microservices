FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/publisher/
ADD /publisher/ /var/publisher/publisher
ADD /common/ /var/publisher/common
COPY /.env.prod /var/publisher/publisher/.env.prod
WORKDIR /var/publisher/publisher
RUN npm install
CMD npm run start:prod
