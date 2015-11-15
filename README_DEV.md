Application Manager Docker Hub
==============================

**Dockerfile for Application Manager Docker Hub**

### Installation

Install [Docker Machine](https://docs.docker.com/machine/install-machine/).

Create virtual machine:
```
docker-machine create -d virtualbox dev
```

Get IP address:
```
docker-machine ip dev
```

Connect to virtual machine:
```
docker-machine ssh dev
```

### Build

Go to shared (between host and virtualbox) home directory:
```
cd /Users/<MAC USER>
cd /c/Users/<WINDOWS USER>
```

Create project directory:
```
mkdir amhub
cd amhub
```

Copy sources to shared (between host and virtualbox) directory:
```
git clone --depth=1 https://github.com/alex-agency/AMHub .
```

Build Docker Image:
```
docker build --force-rm=true -t alexagency/amhub .
```

### Run

Create and run docker container which connected to src directory:
```
docker run -it --rm -p 80:80 -p 8000:8000 -e DOCKER=$(which docker) -v /var/run/docker.sock:/docker.sock -v $(pwd)/src:/AMHub/src alexagency/amhub bash
```

Run NodeJS server with watching for source changing:
```
node server/server.js & grunt watch
```

### Useful Docker Commands 

Show list of all containers:

```
docker ps -a
```

Attach to a running container:

```
docker exec -it <CONTAINER ID> bash
```

To remove all stopeed containers:

```
docker rm $(docker ps -a -q)
```

Show list of all images:

```
docker images
```

To remove image by id:

```
docker rmi -f <IMAGE ID>
```

Delete all existing images:

```
docker rmi $(docker images -q -a)
```
