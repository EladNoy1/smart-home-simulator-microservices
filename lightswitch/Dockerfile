FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/lightswitch/
ADD /lightswitch/ /var/lightswitch/lightswitch
ADD /common/ /var/lightswitch/common
COPY .env.prod /var/lightswitch/lightswitch/.env.prod
WORKDIR /var/lightswitch/lightswitch
RUN npm install
CMD npm run start:prod
