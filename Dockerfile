# docker build -t alex/vmhub /c/Users/ozavgorodniy/docker/vmhub
# docker run -it -p 8080:8080 -e TOMCAT_PASS="alex" alex/vmhub
FROM alexagency/ngbp
MAINTAINER Alex

# copy src
COPY . /app

RUN npm install karma-chrome-launcher --save-dev

# build
RUN grunt build --force

EXPOSE 9018
