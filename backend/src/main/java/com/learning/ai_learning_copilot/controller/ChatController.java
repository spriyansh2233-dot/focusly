package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.service.AITutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private AITutorService aiTutorService;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload Map<String, String> chatMessage) {
        String sessionId = chatMessage.get("sessionId");
        String userMessage = chatMessage.get("message");

        Object userPayload = Map.of("sender", "USER", "content", userMessage);
        messagingTemplate.convertAndSend("/queue/reply-" + sessionId, userPayload);

        String aiResponse = aiTutorService.generateResponse(userMessage);

        Object aiPayload = Map.of("sender", "AI", "content", aiResponse);
        messagingTemplate.convertAndSend("/queue/reply-" + sessionId, aiPayload);
    }
}
