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

    public List<QuizQuestion> getQuestionsForConcept(UUID conceptId) {
        return questionRepository.findByConceptId(conceptId);
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
