Application Manager Docker Hub 2.0
==================================

### Installation on Windows

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

### Build on Windows

Go to shared (between host and virtualbox) home directory:
```
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

### Run on Windows

Create and run docker container which connected to src directory where run NodeJS server with watching for source changing:
```
docker run -it --rm -p 8080:8080 -p 2375:2375 -v /var/run/docker.sock:/var/run/docker.sock -v /c/Users/<WINDOWS USER>/amhub/src:/AMHub/src alexagency/amhub yarn watch
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
