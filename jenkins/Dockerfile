FROM jenkins/jenkins:lts-alpine
MAINTAINER Igor Dmitriev

USER root
# Install Node JS
RUN apk add --update nodejs nodejs-npm
# Install docker compose
RUN apk add py-pip
RUN pip install docker-compose

USER jenkins
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt