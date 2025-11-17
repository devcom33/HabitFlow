FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app


# Copy the prebuilt JAR from Maven
COPY target/*.jar habitflow-image.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "habitflow-image.jar"]

