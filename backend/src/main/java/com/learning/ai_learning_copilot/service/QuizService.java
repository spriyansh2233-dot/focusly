package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.QuizAttempt;
import com.learning.ai_learning_copilot.model.QuizQuestion;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.repository.QuizAttemptRepository;
import com.learning.ai_learning_copilot.repository.QuizQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.Map;
import java.util.ArrayList;

@Service
public class QuizService {

    @Autowired
    private QuizQuestionRepository questionRepository;

    @Autowired
    private QuizAttemptRepository attemptRepository;

    @Autowired
    private SpacedRepetitionService spacedRepetitionService;

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private com.learning.ai_learning_copilot.repository.ConceptRepository conceptRepository;

    public List<QuizQuestion> getQuestionsForConcept(UUID conceptId) {
        // Generate new questions every time to avoid repetition
        return generateAIQuestions(conceptId);
    }

    public List<QuizQuestion> generateAIQuestions(UUID conceptId) {
        var concept = conceptRepository.findById(conceptId)
                .orElseThrow(() -> new RuntimeException("Concept not found"));

        String context = concept.getLearningPath() != null ? concept.getLearningPath().getGoalDescription() : concept.getSubject();
        String prompt = String.format(
            "You are an expert AI tutor. Generate 5 unique, diverse, high-yield conceptual and interview-style questions for the concept: '%s' in the context of '%s'. " +
            "Include a mix of multiple-choice (with 4 distinct options), true/false, and conceptual short answer questions. " +
            "Ensure the questions target common real-world edge cases, architecture decisions, or standard tech interview questions. " +
            "Do NOT repeat generic examples. Provide completely fresh, challenging questions that test deep analytical understanding. " +
            "Return ONLY a valid JSON array. Each object MUST have: " +
            "'questionText' (string), 'options' (array of strings, empty if short answer), 'correctAnswer' (string), 'type' (string: 'MULTIPLE_CHOICE', 'TRUE_FALSE', or 'SHORT_ANSWER').",
            concept.getName(), context
        );

        List<Map<String, Object>> aiQuestions = geminiService.generateJSONContent(prompt);
        
        List<QuizQuestion> savedQuestions = new ArrayList<>();
        for (Map<String, Object> data : aiQuestions) {
            QuizQuestion q = new QuizQuestion();
            q.setConcept(concept);
            q.setQuestionText((String) data.get("questionText"));
            try {
                Object options = data.get("options");
                if (options != null) {
                    q.setOptions(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(options));
                }
            } catch (Exception e) {}
            q.setCorrectAnswer((String) data.get("correctAnswer"));
            q.setQuestionType((String) data.getOrDefault("type", "MULTIPLE_CHOICE"));
            savedQuestions.add(questionRepository.save(q));
        }
        return savedQuestions;
    }

    public QuizAttempt submitAnswer(User user, UUID questionId, String answer, int timeSpent) {
        QuizQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        boolean isCorrect = question.getCorrectAnswer().equalsIgnoreCase(answer.trim());

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(user);
        attempt.setQuestion(question);
        attempt.setUserAnswer(answer);
        attempt.setIsCorrect(isCorrect);
        attempt.setTimeSpentSeconds(timeSpent);
        attemptRepository.save(attempt);

        String quality = isCorrect ? (timeSpent < 10 ? "EXCELLENT" : "GOOD") : "WRONG";
        spacedRepetitionService.updateSchedule(user, question.getConcept(), quality);

        return attempt;
    }
}
