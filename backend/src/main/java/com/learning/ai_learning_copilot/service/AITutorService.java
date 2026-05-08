package com.learning.ai_learning_copilot.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AITutorService {

    @Autowired
    private GeminiService geminiService;

    public String generateResponse(String prompt) {
        return geminiService.generateContent(prompt);
    }
}
