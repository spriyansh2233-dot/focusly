package com.learning.ai_learning_copilot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "Backend is alive 🚀";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
