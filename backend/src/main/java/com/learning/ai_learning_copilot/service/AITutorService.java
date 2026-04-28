package com.learning.ai_learning_copilot.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AITutorService {

    @Value("${gemini.api.key:dummy_key}")
    private String apiKey;

    private final WebClient webClient;

    public AITutorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com").build();
    }

    public String generateResponse(String prompt) {
        String lowerPrompt = prompt.toLowerCase();
        String fallback = "🤖 **Focusly Offline Tutor Mode**\n\nI am currently operating in Offline Fallback Mode. To help you keep up the focus, here is a study tip: Use the **Feynman Technique**—try explaining what you're learning to a 10-year-old to uncover gaps in your understanding!";
        
        if (lowerPrompt.contains("react hooks")) {
            fallback = "🧠 **Focusly AI Tutor Insights: React Hooks**\n\nReact Hooks allow you to use state and other React features without writing a class. \n\n*   `useState`: Manages component state.\n*   `useEffect`: Handles side effects like data fetching or subscriptions.\n*   `useRef`: Persists values across renders without triggering re-renders.";
        } else if (lowerPrompt.contains("quantum physics")) {
            fallback = "🌌 **Focusly AI Tutor Insights: Quantum Physics**\n\nQuantum physics is the study of matter and energy at the most fundamental level. It reveals that particles can behave like waves (wave-particle duality) and exist in multiple states at once (superposition) until observed.";
        } else if (lowerPrompt.contains("let") && lowerPrompt.contains("const")) {
            fallback = "💻 **Focusly AI Tutor Insights: Let vs Const**\n\nIn modern JavaScript:\n*   `const`: Used for variables that will not be reassigned. It creates a block-scoped read-only reference.\n*   `let`: Used for variables that *will* be reassigned later.\nBoth are block-scoped.";
        } else if (lowerPrompt.contains("spaced repetition")) {
            fallback = "📈 **Focusly AI Tutor Insights: Spaced Repetition**\n\nSpaced repetition leverages the spacing effect. By reviewing materials at increasing intervals (e.g., 1 day, 3 days, 7 days), you interrupt the forgetting curve and reinforce long-term memory retention.";
        }

        if (apiKey.equals("dummy_key")) {
            return fallback;
        }

        try {
            Map<String, Object> requestBody = new java.util.HashMap<>();
            requestBody.put("contents", java.util.List.of(
                java.util.Map.of("parts", java.util.List.of(java.util.Map.of("text", prompt)))
            ));

            Map<String, Object> response = webClient.post()
                    .uri("/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("candidates")) {
                return fallback;
            }

            java.util.List<Map<String, Object>> candidates = (java.util.List<Map<String, Object>>) response.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                return fallback;
            }

            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            java.util.List<Map<String, Object>> parts = (java.util.List<Map<String, Object>>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            return fallback;
        }
    }
}
