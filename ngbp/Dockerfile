# docker build -t alex/ngbp /c/Users/ozavgorodniy/docker/vmhub/ngbp/
# docker run -it -p 8080:8080 -e TOMCAT_PASS="alex" alex/ngbp
FROM tutum/tomcat:latest
MAINTAINER Alex

# cleanup base image
RUN rm -rf /tomcat/webapps/*

# install dependencies
RUN apt-get update && apt-get install -y nodejs npm git
RUN ln -s /usr/bin/nodejs /usr/bin/node

# make workspace
RUN mkdir /app
WORKDIR /app

# get ngbp project
ENV NGBP_BRANCH  v0.3.2-release
RUN git clone -b $NGBP_BRANCH git://github.com/joshdmiller/ng-boilerplate . && \
	rm -rf .git

# install ngbp dependencies
RUN npm -g install grunt-cli karma bower && \
 	npm install && \
 	bower install --allow-root

# build
RUN grunt build --force

# deploy
RUN ln -s /app/build /tomcat/webapps/ROOT
