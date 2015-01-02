FROM alexagency/ngbp
MAINTAINER Alex

# copy src
COPY . /app

# build
RUN grunt build

# run after start
RUN sed -i s@exec@'exec node /app/src/common/proxy/proxy.js \&'@g /run.sh

EXPOSE 8000
