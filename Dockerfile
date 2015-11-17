FROM node:4.2.2-slim
MAINTAINER Alex

# resolve docker dependencies
RUN apt-get update && apt-get install -y libapparmor-dev && \
    apt-get clean && \
    wget -c http://cz.archive.ubuntu.com/ubuntu/pool/main/l/lvm2/libdevmapper1.02.1_1.02.99-1ubuntu1_amd64.deb && \
    wget -c http://cz.archive.ubuntu.com/ubuntu/pool/main/l/lvm2/dmsetup_1.02.99-1ubuntu1_amd64.deb && \
    dpkg -i dmsetup_1.02.99-1ubuntu1_amd64.deb libdevmapper1.02.1_1.02.99-1ubuntu1_amd64.deb && \
    rm -fv dmsetup_1.02.99-1ubuntu1_amd64.deb libdevmapper1.02.1_1.02.99-1ubuntu1_amd64.deb

# install dev env
RUN npm -g install grunt-cli karma --save-dev bower && \
    npm cache clear

# set app dir
WORKDIR /AMHub

# install git and supervisord 
RUN apt-get update && apt-get install -y git supervisor && \
    apt-get clean

# this allow speed up build proccess for minor changes
RUN git clone --depth=1 https://github.com/alex-agency/AMHub . && \
    npm install && bower install --allow-root

# copy supervisord configs
COPY ./server/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./server/node.conf /etc/supervisor/conf.d/node.conf

# copy project
COPY . /AMHub

# install project dependencies
RUN npm install && bower install --allow-root && \
    npm cache clear && bower cache clean --allow-root

# build
RUN grunt build --force

# default exec configuration to container
CMD ["supervisord"]

# inform which port could be opened
EXPOSE 80 8000
