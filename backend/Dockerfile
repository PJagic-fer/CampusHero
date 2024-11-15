# Stage 1: Build the application using Maven
FROM maven:3.8.1-openjdk-17-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the entire source code into the container
COPY src ./src

# Package the Spring Boot application
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM alpine/java:17-jre

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file from the builder stage
COPY --from=builder /app/target/*.jar /app.jar

EXPOSE 8080
# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app.jar"]
