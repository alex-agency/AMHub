[![Build Status](https://api.travis-ci.org/alex-agency/AMHub.png)](https://travis-ci.org/alex-agency/AMHub)

Application Manager Docker Hub
===============================

## Demo

This project is containerized by docker and you can simply run it:

```
# docker pull alexagency/amhub
# docker run -it --rm -p 80:80 -p 8000:8000 -v /var/run/docker.sock:/docker.sock alexagency/amhub
```

and browsing to http://localhost/.

In case if you using boot2docker browsing to its ip address.

