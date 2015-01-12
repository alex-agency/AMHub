FROM node:slim
MAINTAINER Alex

# install dev env
RUN npm -g install grunt-cli karma --save-dev bower

# set app dir
WORKDIR /AMHub

# get project
RUN git clone https://github.com/alex-agency/AMHub . && \
	rm -rf .git

# install project dependencies
RUN npm install && \
	bower install --allow-root

# build
RUN grunt build compile

# Exec configuration to container
CMD node server/server.js

# Inform which port could be opened
EXPOSE 80 8000
