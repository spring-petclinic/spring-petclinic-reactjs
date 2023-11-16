FROM alpine:latest
RUN apk update && apk add openjdk8 maven
WORKDIR /app
COPY pom.xml .
COPY ./src ./src
RUN mvn install
RUN mvn clean package
#COPY app/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "target/petclinic.jar"]