package com.learning.ai_learning_copilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AiLearningCopilotApplication {

	public static void main(String[] args) {
		loadEnv();
		SpringApplication.run(AiLearningCopilotApplication.class, args);
	}

	private static void loadEnv() {
		try {
			java.io.File file = new java.io.File(".env");
			if (file.exists()) {
				java.nio.file.Files.lines(file.toPath()).forEach(line -> {
					line = line.trim();
					if (line.isEmpty() || line.startsWith("#")) {
						return;
					}
					int delimiterIdx = line.indexOf("=");
					if (delimiterIdx > 0) {
						String key = line.substring(0, delimiterIdx).trim();
						String value = line.substring(delimiterIdx + 1).trim();
						if (System.getenv(key) == null && System.getProperty(key) == null) {
							System.setProperty(key, value);
						}
					}
				});
			}
		} catch (Exception e) {
			System.err.println("Failed to load .env file: " + e.getMessage());
		}
		checkAndFallbackDb();
	}

	private static void checkAndFallbackDb() {
		String url = System.getProperty("SPRING_DATASOURCE_URL");
		if (url == null) {
			url = System.getenv("SPRING_DATASOURCE_URL");
		}
		if (url != null && url.startsWith("jdbc:postgresql:")) {
			String user = System.getProperty("SPRING_DATASOURCE_USERNAME");
			if (user == null) user = System.getenv("SPRING_DATASOURCE_USERNAME");
			String pass = System.getProperty("SPRING_DATASOURCE_PASSWORD");
			if (pass == null) pass = System.getenv("SPRING_DATASOURCE_PASSWORD");

			System.out.println("Validating PostgreSQL database connection...");
			try {
				Class.forName("org.postgresql.Driver");
				java.sql.DriverManager.setLoginTimeout(3);
				try (java.sql.Connection conn = java.sql.DriverManager.getConnection(url, user, pass)) {
					System.out.println("PostgreSQL connection validated successfully!");
				}
			} catch (Exception e) {
				System.err.println("WARNING: PostgreSQL connection failed (" + e.getMessage() + ")");
				System.err.println("Falling back to local in-memory H2 database for a seamless offline/local experience...");
				System.setProperty("SPRING_DATASOURCE_URL", "jdbc:h2:mem:focuslydb;DB_CLOSE_DELAY=-1");
				System.setProperty("SPRING_DATASOURCE_DRIVER", "org.h2.Driver");
				System.setProperty("SPRING_DATASOURCE_USERNAME", "sa");
				System.setProperty("SPRING_DATASOURCE_PASSWORD", "");
				System.setProperty("SPRING_JPA_DIALECT", "org.hibernate.dialect.H2Dialect");
			}
		}
	}

}
