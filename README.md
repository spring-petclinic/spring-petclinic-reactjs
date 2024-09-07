# Spring PetClinic Sample - Reactjs Version

## Motivation

> As a long-time enthusiast of both [Java](https://dev.java/) and [React](https://react.dev/) technologies, I saw an exciting opportunity to rework the **Spring PetClinic Reactjs Version** project and combine creativity and technical skills into something robust and modern. Having used Java and React since my student days, I wanted to restructure the project into a multimodule [Maven](https://maven.apache.org/) project, taking full advantage of React for the frontend and [Spring Boot](https://github.com/spring-projects/spring-boot?tab=readme-ov-file#spring-boot---) for the backend. - Firas Regaieg

This project consists is composed of 2 subprojects:
1. **Spring PetClinic Reactjs Client** – React-based web UI client application.
2. **Spring PetClinic Rest** – [REST API](https://restfulapi.net/) backend, integrated as a [Git submodule](https://git-scm.com/docs/gitsubmodules).

The choice of using **Spring PetClinic Rest** as Git Submodule ensures that the backend can be updated independently without requiring code duplication. It also keeps the project stable by locking a specific version whenever there are breaking changes in the **Spring PetClinic Rest** subproject.

NOTE ⚠️: _Some CRUD functionalities in the client are not fully implemented yet due to unresolved issues in the **Spring PetClinic Rest** repository ((like fetching Pets of a specific Owner. Currently, there is an [opened issue](https://github.com/spring-petclinic/spring-petclinic-rest/issues/145) about this), these will be addressed as soon as the backend fixes are made (by community), ensuring that the client-side work can proceed smoothly._

## Technology Stack Overview

The **Spring PetClinic Reactjs Client** is built with a modern stack to ensure some interesting characteristics such as scalability and maintainability. Here's a brief overview of the key technologies used:

### React Framework

[React Admin](https://marmelab.com/react-admin/) was chosen as the primary framework for managing much stuff together, easily, like the UI, the REST API operations, routing, etc. It provides a ready-to-use solution for building data-driven applications, especially for admin dashboards. Its components and features fit perfectly with the structure of the PetClinic project, offering powerful tools to handle CRUD operations, authentication, data visualization, and more. The ability to easily extend and customize React Admin ensures that we can adapt it to the specific needs of any application!

### Build Tool

To enhance the development and build process, [Vite.js](https://vitejs.dev/) was chosen as the [build tool](https://en.wikipedia.org/wiki/Build_automation). Compared to traditional tools like [Webpack](https://webpack.js.org/), Vite offers blazing-fast development times, hot module replacement (HMR), and an overall faster build process, which significantly improves the developer experience. Its focus on modern [ES modules](https://nodejs.org/api/esm.html#introduction) also aligns perfectly with the React.js ecosystem.

### Language

[Typescript](https://www.typescriptlang.org/) was selected to provide type safety and improve code maintainability. By using TypeScript, we reduce runtime errors and make the development process smoother through better [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) support, autocompletion, and refactoring tools. Strict typing ensures that the codebase is robust and reliable, making it easier to collaborate on.

### Linting and Code Formatting

To ensure code quality and consistency, [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) are used for linting and formatting. ESLint helps catch errors and enforce coding standards, while Prettier ensures consistent code formatting across the project. By integrating both tools into the development workflow, we can maintain a clean, readable, and standardized codebase.

NOTE: _It's worth noting that a very useful tool has been used to configure ESLint and Prettier without boilerplate configurations. It's [ESLint Config Universe](https://github.com/expo/expo/tree/main/packages/eslint-config-universe#eslint-config-universe) developed by [Expo](https://expo.dev/) team._

### Forms Management

Forms are a critical part of any admin application. [React Hook Form](https://react-hook-form.com/) simplifies form management by providing a minimalistic and performant API for handling form state, validation, and submission. Paired with [Yup](https://github.com/jquense/yup?tab=readme-ov-file#yup), a schema validation JS library, the form-handling process becomes powerful and clean, making it easier to manage form data and enforce validation rules throughout the application.

### Routing

For _custom_ navigation, [React Router](https://reactrouter.com/en/main/start/overview) provides a declarative way to manage routes in React.
