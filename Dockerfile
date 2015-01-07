FROM alexagency/ngbp
MAINTAINER Alex

# install dependencies
RUN bower install angular-resource#~1.2 --allow-root \
	bootswatch-dist#3.3.0-cerulean --allow-root

# replace source
COPY . /usr/src/

# build
RUN grunt build

RUN chmod -v +x run.sh

EXPOSE 8000
