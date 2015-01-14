[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Application Manager Docker Hub
===============================

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

In case if you using boot2docker browsing to its ip address.

## License

  [MIT](LICENSE)

[travis-image]: https://travis-ci.org/alex-agency/AMHub.svg?style=flat
[travis-url]: https://travis-ci.org/alex-agency/AMHub
[coveralls-image]: https://img.shields.io/coveralls/alex-agency/AMHub.svg?style=flat
[coveralls-url]: https://coveralls.io/r/alex-agency/AMHub?branch=master
