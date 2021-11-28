FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/fetcher/
ADD /fetcher/ /var/fetcher/fetcher
ADD /common/ /var/fetcher/common
COPY /.env.prod /var/fetcher/fetcher/.env.prod
WORKDIR /var/fetcher/fetcher
RUN npm install
CMD npm run start:prod
