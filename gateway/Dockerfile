FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/gateway/
ADD /gateway/ /var/gateway/gateway
ADD /common/ /var/gateway/common
COPY /.env.prod /var/gateway/gateway/.env.prod
WORKDIR /var/gateway/gateway
RUN npm install
CMD npm run start:prod
