package com.learning.ai_learning_copilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AiLearningCopilotApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiLearningCopilotApplication.class, args);
	}

}
