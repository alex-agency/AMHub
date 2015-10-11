[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Application Manager Docker Hub
===============================

## Containers View 
Shows all docker containers.

![1](https://cloud.githubusercontent.com/assets/1122708/10415286/ab11dc32-6ffb-11e5-90c8-5f33b935b517.jpg)

## Container Info
Shows container details. 
The HTTP Connect button opens new browser's tab and redirects to particular port of container. 

![2](https://cloud.githubusercontent.com/assets/1122708/10415287/ab2702ec-6ffb-11e5-9b77-a75fd3dbdf69.jpg)

## Commit Container
Saves all container changes to new docker image.

![3](https://cloud.githubusercontent.com/assets/1122708/10415288/ab39d41c-6ffb-11e5-9143-05cb96c41c74.jpg)

## Image Info
Shows image details. 

![4](https://cloud.githubusercontent.com/assets/1122708/10415290/ab3a824a-6ffb-11e5-90e2-37200767a7fa.jpg)

## Images View 
Shows all docker images.

![5](https://cloud.githubusercontent.com/assets/1122708/10415956/8ec26804-7009-11e5-86c4-ca2e916a10a7.jpg)
## Create Container
Creates new docker container from image. It allows to bind particular volumes, ip or ports.

![6](https://cloud.githubusercontent.com/assets/1122708/10415293/ab3c73ac-6ffb-11e5-8614-97c65c1eab8a.jpg)

## Remove Image
Removes image and all containers which were created from this image.

![7](https://cloud.githubusercontent.com/assets/1122708/10415289/ab3a3150-6ffb-11e5-9219-da1182329fa3.jpg)

## Browse Repos
Browses public Docker Hub repository and allows pulling images from Docker Hub.

![8](https://cloud.githubusercontent.com/assets/1122708/10415292/ab3c0af2-6ffb-11e5-9bea-7c266dd9a495.jpg)

## Settings
Allows to choose between Advanced and Simple views, sets Global Filter for images and containers.
And manages available virtual ip-addresses.

![9](https://cloud.githubusercontent.com/assets/1122708/10415294/ab5190d4-6ffb-11e5-9f15-8ac3b0e526b9.jpg)

## Demo

This project is containerized by docker and you can simply run it:

```
# docker pull alexagency/amhub
# docker run -d -p 80:80 -p 8000:8000 -v /var/run/docker.sock:/docker.sock alexagency/amhub
```

and browsing to it:

```
  http://localhost/
```

In case if you using docker-machine, create new docker machine and use its ip-address.

```
  docker-machine create -d virtualbox dev
  docker-machine ip dev
  eval "$(docker-machine env dev)"
  docker-machine ssh dev
```

## License

  [MIT](LICENSE)

[travis-image]: https://travis-ci.org/alex-agency/AMHub.svg?style=flat
[travis-url]: https://travis-ci.org/alex-agency/AMHub
[coveralls-image]: https://img.shields.io/coveralls/alex-agency/AMHub.svg?style=flat
[coveralls-url]: https://coveralls.io/r/alex-agency/AMHub?branch=master
