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

        int maxRetries = 3;
        for (int i = 0; i < maxRetries; i++) {
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

                if (response != null && response.containsKey("candidates")) {
                    List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                    if (!candidates.isEmpty()) {
                        Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                        if (content != null && content.containsKey("parts")) {
                            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                            if (!parts.isEmpty()) {
                                String text = (String) parts.get(0).get("text");
                                if (text != null && !text.trim().isEmpty()) {
                                    return text;
                                }
                            }
                        }
                    }
                }
                throw new RuntimeException("AI returned empty or invalid structure.");
            } catch (Exception e) {
                if (i == maxRetries - 1) {
                    throw new RuntimeException("Error calling AI service: " + e.getMessage(), e);
                }
                try {
                    Thread.sleep(1000 * (i + 1));
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        throw new RuntimeException("No response from AI after retries.");
    }

    public List<Map<String, Object>> generateJSONContent(String prompt) {
        int maxRetries = 3;
        for (int i = 0; i < maxRetries; i++) {
            try {
                String rawResponse = generateContent(prompt + "\n\nIMPORTANT: Return ONLY a valid JSON array. No markdown, no triple backticks, no explanations. Strictly JSON.");
                String cleanJson = rawResponse.replaceAll("```json", "").replaceAll("```", "").trim();
                
                // Fallback for partial JSON or non-array start
                if (!cleanJson.startsWith("[")) {
                    cleanJson = "[" + cleanJson + "]";
                }
                
                return objectMapper.readValue(cleanJson, List.class);
            } catch (Exception e) {
                System.err.println("Failed to parse AI JSON, retrying (" + i + "): " + e.getMessage());
                if (i == maxRetries - 1) {
                    return List.of();
                }
            }
        }
        return List.of();
    }

    public Map<String, Object> generateJSONObjectContent(String prompt) {
        int maxRetries = 3;
        for (int i = 0; i < maxRetries; i++) {
            try {
                String rawResponse = generateContent(prompt + "\n\nIMPORTANT: Return ONLY a valid JSON object. No markdown, no triple backticks, no explanations. Strictly JSON.");
                String cleanJson = rawResponse.replaceAll("```json", "").replaceAll("```", "").trim();
                
                // Fallback for partial JSON or non-object start
                if (!cleanJson.startsWith("{")) {
                    cleanJson = "{" + cleanJson + "}";
                }
                
                return objectMapper.readValue(cleanJson, Map.class);
            } catch (Exception e) {
                System.err.println("Failed to parse AI Object JSON, retrying (" + i + "): " + e.getMessage());
                if (i == maxRetries - 1) {
                    return new HashMap<>();
                }
            }
        }
        return new HashMap<>();
    }
}
