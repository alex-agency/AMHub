docker build --force-rm=true -t alex/amhub .
docker run -it --rm -p 80:80 -p 8000:8000 -v /var/run/docker.sock:/docker.sock -v $(pwd)/src:/AMHub/src alex/amhub bash
supervisord & grunt watch
