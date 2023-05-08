FROM openjdk:11
#ARG JAR_FILE=./build/libs/client-0.0.1-SNAPSHOT.jar
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]
ARG WAR_FILE=./build/libs/client.war
COPY ${WAR_FILE} app.war
ENTRYPOINT ["java","-jar","/app.war"]
