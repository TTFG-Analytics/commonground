FROM ubuntu
MAINTAINER TTFG-Analytics

RUN apt-get update
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash
RUN apt-get install nodejs
RUN apt-get -y install git \
  postgresql

RUN npm install -g nodemon \
  webpack \
  knex

RUN git clone -b dockerTest --single-branch https://github.com/tinytheyfon8/commonground.git

WORKDIR /commonground
RUN npm install && webpack

WORKDIR /commonground/db
RUN knex migrate:latest

WORKDIR /commonground

EXPOSE 4040

CMD ["node", "./server/index.js"]