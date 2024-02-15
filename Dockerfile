FROM maven:3.8.8-amazoncorretto-8-al2023 AS builder
EXPOSE 8080
WORKDIR app
COPY . /app/
RUN mvn clean install

FROM openjdk:8-jre
WORKDIR app
COPY --from=builder /app/target/*.jar petclinic.jar

CMD ["java" , "-jar" , "petclinic.jar"]