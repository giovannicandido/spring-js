Spring JS
==================

This project is configured to show the integration between spring framework and client side development.

Is based on [https://github.com/spring-io/sagan](https://github.com/spring-io/sagan)

This project is separeted in two: **server** and **client**

The **server** project depends on **client**

# How to use

There is two modes to run the project: __development__ and __production__


The default mode is production. It will bundle the javascript files and minify css between other things. That is done
using gulp and nodejs and the gradle.build file is configured to run this commands.

In develop mode the project will not run the build in gulp and will serve the files direct from the filesystem. So you
can run `gulp watch` or `gulp build-dev` directly to build interface. The spring server is also configured to not cache files

To run in production mode use the command:

```
./gradlew :server:bootRun
```

To run in development mode. Create a file *server/src/main/resources/application-development.yml* setup the absolute location
to the project (an example is provided in the file with final name .dist) and run:

```
export SPRING_PROFILES_ACTIVE=development
./gradlew :server:bootRun
```
