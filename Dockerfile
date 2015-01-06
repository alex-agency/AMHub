FROM alexagency/ngbp
MAINTAINER Alex

# install dependencies
RUN bower install angular-resource#~1.2 --allow-root \
	#bootswatch-dist#3.3.0-cerulean --allow-root \
	components-font-awesome --allow-root

# replace source
COPY . /app

# build
RUN grunt build

# run after start
RUN sed -i s@exec@'exec node /app/server/proxy.js \&'@g /run.sh

EXPOSE 8000
