FROM node:slim
MAINTAINER Alex

# install dev env
RUN npm -g install grunt-cli karma --save-dev bower && \
    rm -rf ~/.npm && npm cache clear

# set app dir
WORKDIR /AMHub

# this allow speed up build proccess for minor changes
RUN git clone https://github.com/alex-agency/AMHub . && \
    rm -rf .git && \
    npm install && \
    bower install --allow-root

# install supervisord
RUN apt-get update && apt-get install -y supervisor && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# copy supervisord configs
COPY ./server/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./server/node.conf /etc/supervisor/conf.d/node.conf

# copy project
COPY . /AMHub

# install project dependencies
RUN npm install && bower install --allow-root && \
    rm -rf ~/.npm && npm cache clear && bower cache clean --allow-root

# build
RUN grunt build compile

# default exec configuration to container
CMD ["supervisord"]

# inform which port could be opened
EXPOSE 80 8000

# should be mounted to docker unix socket
VOLUME /docker.sock

# can be mounted to dev src directory
VOLUME /AMHub/src
