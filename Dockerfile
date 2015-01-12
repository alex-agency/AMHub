FROM node:slim
MAINTAINER Alex

# install dev env
RUN npm -g install grunt-cli karma --save-dev bower

# set app dir
WORKDIR /usr/src/

# get project
RUN git clone https://github.com/alex-agency/AMHub . && \
	rm -rf .git

# install project dependencies
RUN npm install && \
	bower install --allow-root

# install server.js dependencies
RUN npm install serve-static finalhandler

# replace source
COPY . /usr/src/

# install source dependencies
RUN npm install && \
	bower install --allow-root

# build
RUN grunt build compile

# Exec configuration to container
RUN chmod -v +x run.sh
CMD "./run.sh"

# Inform which port could be opened
EXPOSE 80 9019 8000
