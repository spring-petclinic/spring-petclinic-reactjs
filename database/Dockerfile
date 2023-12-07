FROM postgres:alpine


ENV POSTGRES_USER me
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB petclinic

COPY *.sql /docker-entrypoint-initdb.d/

CMD ["postgres"]