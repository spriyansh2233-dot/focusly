package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.security.JwtTokenProvider;
import com.learning.ai_learning_copilot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        try {
            User user = userService.registerUser(
                payload.get("username"),
                payload.get("email"),
                payload.get("password")
            );
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", user.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }

        String token = tokenProvider.generateToken(userOpt.get().getEmail());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
            "id", userOpt.get().getId(),
            "username", userOpt.get().getUsername(),
            "email", userOpt.get().getEmail()
        ));
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/test-token")
    public ResponseEntity<?> testToken(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        try {
            boolean valid = tokenProvider.validateToken(token);
            String email = null;
            boolean userFound = false;
            if (valid) {
                email = tokenProvider.getEmailFromToken(token);
                Optional<User> u = userService.findByEmail(email);
                userFound = u.isPresent();
            }
            return ResponseEntity.ok(Map.of(
                "valid", valid,
                "email", email == null ? "null" : email,
                "userFound", userFound
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong2");
    }
}
