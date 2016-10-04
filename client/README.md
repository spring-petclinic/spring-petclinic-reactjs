# React Frontend for Spring Boot PetClinic demo

This project is a port of the Spring (Boot) PetClinic demo with a frontend built using [ReactJS](https://facebook.github.io/react/) and
[TypeScript](https://www.typescriptlang.org/). 

I habe tried to make as few modifications to the backend code as neccessary to the [spring-boot branch](https://github.com/spring-projects/spring-petclinic/tree/springboot) of the original sample project.
Mainly I've added the new package `org.springframework.samples.petclinic.web.api`
that contains the REST Api that is used by the React frontend. In this package most of the classes are taken 
from the [angularjs version](https://github.com/spring-projects/spring-petclinic/tree/angularjs) of the demo.

## Install and run

Note: Spring Boot Server App must be running before starting the client!

To start the server, launch a Terminal and run from the project's root folder (`spring-petclinic`):
```
./mvnw spring-boot:run
```

When the server is running you can try to access the API for example to query all known pet types:
```
curl http://localhost:8080/api/pettypes
```

BTW: the original (JSP-based) frontend is still available at `http://localhost:8080`.

After starting the server you can install and run the client from the `client` folder:

1. `npm install` (installs the node modules and the TypeScript definition files)
2. `PORT=4444 npm start` 
3. Open `http://localhost:4444`

(Why not use the same server for backend and frontend? Because Webpack does a great job for serving JavaScript-based SPAs and I think it's not too uncommon to run this kind of apps using two dedicated server, one for backend, one for frontend)

## TODO

There's a lot room for improvements of this example. I've collected a list of TODOs [here](TODO.md)

## Feedback

In case you have any comments, questions, bugs, enhancements feel free to open an issue in this repository.
In case you want to follow me on twitter, my handle is [@nilshartmann](https://twitter.com/nilshartmann).



