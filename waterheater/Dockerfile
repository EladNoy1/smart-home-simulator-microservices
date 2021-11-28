FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/waterheater/
ADD /waterheater/ /var/waterheater/waterheater
ADD /common/ /var/waterheater/common
COPY /.env.prod /var/waterheater/waterheater/.env.prod
WORKDIR /var/waterheater/waterheater
RUN npm install
CMD npm run start:prod
