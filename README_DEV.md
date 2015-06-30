
## Create dev workstation

```
docker-machine create -d virtualbox dev

```

## Get IP address

```
docker-machine ip dev

```

## Connect Docker

```
eval "$(docker-machine env dev)"

```

## Build create image and source code

```
docker-machine ssh dev
cd /Users/Alex/Docker/AMHub
cd /c/Users/ozavgorodniy/docker/AMHub
docker build --force-rm=true -t alex/amhub .

```

## Run server from source code

```
docker run -it --rm -p 80:80 -p 8000:8000 -v /var/run/docker.sock:/docker.sock -v $(pwd)/src:/AMHub/src alex/amhub bash
node server/server.js & grunt watch

```

## Cleanup dev workstation

```
docker-machine ssh dev
docker rm -f $(docker ps -aq)
docker rmi $(docker images -q)

```

