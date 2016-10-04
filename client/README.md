# React Frontend for Spring Boot PetClinic demo

## Backend

The backend source code is based on the `spring-boot` and the `angularjs` branch in the sample repository:
* `https://github.com/spring-projects/spring-petclinic/tree/springboot`
* `https://github.com/spring-projects/spring-petclinic/tree/angularjs`

## Install and run

Note: Spring Boot App must be running before starting the client!

To start the server launch a Terminal an run from the project's root folder (`spring-petclinic`):
```
spring-petclinic$ ./mvnw spring-boot:run
```

Then you can install and run the client from the `client` folder:

1. `npm install` (installs the node modules and the TypeScript definition files)
2. `PORT=4444 npm start` 
3. Open `http://localhost:4444`

