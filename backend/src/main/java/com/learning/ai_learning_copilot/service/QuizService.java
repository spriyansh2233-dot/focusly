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
        List<QuizQuestion> existing = questionRepository.findByConceptId(conceptId);
        if (existing.isEmpty()) {
            return generateAIQuestions(conceptId);
        }
        return existing;
    }

    public List<QuizQuestion> generateAIQuestions(UUID conceptId) {
        var concept = conceptRepository.findById(conceptId)
                .orElseThrow(() -> new RuntimeException("Concept not found"));

        String prompt = String.format(
            "Generate 5 multiple-choice questions for the concept: '%s' in the context of '%s'. " +
            "Return ONLY a JSON array. Each object should have: " +
            "'questionText' (string), 'options' (array of strings), 'correctAnswer' (string). " +
            "Ensure questions are challenging and test deep understanding.",
            concept.getTitle(), concept.getLearningPath().getGoalDescription()
        );

        List<Map<String, Object>> aiQuestions = geminiService.generateJSONContent(prompt);
        
        return aiQuestions.stream().map(data -> {
            QuizQuestion q = new QuizQuestion();
            q.setConcept(concept);
            q.setQuestionText((String) data.get("questionText"));
            try {
                q.setOptions(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(data.get("options")));
            } catch (Exception e) {}
            q.setCorrectAnswer((String) data.get("correctAnswer"));
            q.setQuestionType("MULTIPLE_CHOICE");
            return questionRepository.save(q);
        }).toList();
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
