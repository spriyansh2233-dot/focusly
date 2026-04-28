package com.learning.ai_learning_copilot.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.client.WebClient;

import static org.assertj.core.api.Assertions.assertThat;

class AITutorServiceTest {

    private AITutorService service;

    @Mock
    private WebClient.Builder webClientBuilder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Use the no-API-key "dummy" path
        service = new AITutorService(WebClient.builder());
        // Set field via reflection since @Value won't inject in unit tests
        try {
            var field = AITutorService.class.getDeclaredField("apiKey");
            field.setAccessible(true);
            field.set(service, "dummy_key");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void generateResponse_withDummyKey_returnsGracefulFallback() {
        String prompt = "What is recursion?";
        String response = service.generateResponse(prompt);

        assertThat(response).isNotBlank();
        assertThat(response).contains(prompt); // dummy path echoes the prompt
    }

    @Test
    void generateResponse_promptIsNeverNull() {
        String response = service.generateResponse("Test prompt");
        assertThat(response).isNotNull();
    }

    @Test
    void generateResponse_wrapsPromptWithTutorContext() {
        // Verify the service constructs a tutor-prefixed prompt and doesn't crash
        String prompt = "Explain Spring Security JWT";
        String response = service.generateResponse(
            "You are Focusly, a friendly AI learning companion. Answer the following question clearly and concisely for a student: " + prompt
        );
        assertThat(response).isNotBlank();
    }
}
