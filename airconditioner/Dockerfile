FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/airconditioner/
ADD /airconditioner/ /var/airconditioner/airconditioner
ADD /common/ /var/airconditioner/common
COPY /.env.prod /var/airconditioner/airconditioner/.env.prod
WORKDIR /var/airconditioner/airconditioner
RUN npm install
CMD npm run start:prod
