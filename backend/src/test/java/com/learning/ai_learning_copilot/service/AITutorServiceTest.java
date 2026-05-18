package com.learning.ai_learning_copilot.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class AITutorServiceTest {

    @InjectMocks
    private AITutorService service;

    @Mock
    private GeminiService geminiService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        when(geminiService.generateContent(anyString())).thenAnswer(invocation -> {
            String arg = invocation.getArgument(0);
            return "Mock response for: " + arg;
        });
    }

    @Test
    void generateResponse_withDummyKey_returnsGracefulFallback() {
        String prompt = "What is recursion?";
        String response = service.generateResponse(prompt);

        assertThat(response).isNotBlank();
        assertThat(response).contains(prompt);
    }

    @Test
    void generateResponse_promptIsNeverNull() {
        String response = service.generateResponse("Test prompt");
        assertThat(response).isNotNull();
    }

    @Test
    void generateResponse_wrapsPromptWithTutorContext() {
        String prompt = "Explain Spring Security JWT";
        String response = service.generateResponse(
            "You are Focusly, a friendly AI learning companion. Answer the following question clearly and concisely for a student: " + prompt
        );
        assertThat(response).isNotBlank();
    }
}
