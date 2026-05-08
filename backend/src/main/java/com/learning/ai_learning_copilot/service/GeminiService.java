package com.learning.ai_learning_copilot.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key:dummy_key}")
    private String apiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public GeminiService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com").build();
        this.objectMapper = objectMapper;
    }

    public String generateContent(String prompt) {
        if (apiKey.equals("dummy_key")) {
            return "AI Service is in offline mode. Please configure GEMINI_API_KEY.";
        }

        try {
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", List.of(
                Map.of("parts", List.of(Map.of("text", prompt)))
            ));

            Map<String, Object> response = webClient.post()
                    .uri("/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("candidates")) {
                return "No response from AI.";
            }

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            return "Error calling AI service: " + e.getMessage();
        }
    }

    public List<Map<String, Object>> generateJSONContent(String prompt) {
        String rawResponse = generateContent(prompt + "\n\nIMPORTANT: Return ONLY a valid JSON array. No markdown, no triple backticks, no explanations.");
        try {
            // Clean markdown if AI included it
            String cleanJson = rawResponse.replaceAll("```json", "").replaceAll("```", "").trim();
            return objectMapper.readValue(cleanJson, List.class);
        } catch (Exception e) {
            System.err.println("Failed to parse AI JSON: " + e.getMessage());
            return List.of();
        }
    }
}
