FROM alexagency/ngbp
MAINTAINER Alex

# replace source
COPY . /usr/src/

# install dependencies
RUN bower install --allow-root

# build
RUN grunt build compile

# exec after start
RUN chmod -v +x run.sh

EXPOSE 8000
