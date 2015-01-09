FROM node:slim
MAINTAINER Alex

# set app dir
WORKDIR /usr/src/

# get ngbp project
ENV NGBP_BRANCH  v0.3.2-release
RUN git clone -b $NGBP_BRANCH git://github.com/joshdmiller/ng-boilerplate . && \
	rm -rf .git

# install dev env
RUN npm -g install grunt-cli karma --save-dev bower

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
