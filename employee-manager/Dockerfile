FROM openjdk:17-jdk-alpine3.12

RUN addgroup -S app && adduser -S app -G app

USER app

COPY target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]