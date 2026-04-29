FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY backend/ .
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests
EXPOSE 8080
RUN apt-get update && apt-get install -y socat
CMD ["sh","-c","socat TCP4-LISTEN:5432,fork,reuseaddr TCP6:[db.wfowipzthkglrxgyayec.supabase.co]:5432 & java -jar target/*.jar"]
