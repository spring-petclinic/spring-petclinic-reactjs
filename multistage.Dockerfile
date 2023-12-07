FROM alpine:latest AS builder
RUN apk update && apk add openjdk8 maven
WORKDIR /app
COPY pom.xml .
COPY ./src ./src
RUN mvn install -Dmaven.test.skip=true
RUN mvn clean package -Dmaven.test.skip=true


FROM alpine:latest
RUN apk update && apk add openjdk8
WORKDIR /app
COPY --from=builder app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar", "-Dspring.profiles.active=postgres"]