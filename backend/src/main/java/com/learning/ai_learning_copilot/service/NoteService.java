package com.learning.ai_learning_copilot.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learning.ai_learning_copilot.model.Note;
import com.learning.ai_learning_copilot.model.NoteSummary;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.repository.NoteRepository;
import com.learning.ai_learning_copilot.repository.NoteSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.Map;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private NoteSummaryRepository noteSummaryRepository;

    @Autowired
    private FileParserService fileParserService;

    @Autowired
    private GeminiService geminiService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Note> getNotesForUser(User user) {
        return noteRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Note> searchNotes(User user, String query) {
        return noteRepository.findByUserAndTitleContainingIgnoreCase(user, query);
    }

    public Note getNoteByIdAndUser(UUID id, User user) {
        return noteRepository.findById(id)
                .filter(note -> note.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new IllegalArgumentException("Note not found or unauthorized"));
    }

    @Transactional
    public Note createNote(User user, String title, String content) {
        Note note = new Note();
        note.setUser(user);
        note.setTitle(title);
        note.setContent(content);
        return noteRepository.save(note);
    }

    @Transactional
    public Note uploadNote(User user, MultipartFile file) throws Exception {
        String content = fileParserService.extractText(file);
        Note note = new Note();
        note.setUser(user);
        note.setTitle(file.getOriginalFilename());
        note.setContent(content);
        note.setFileName(file.getOriginalFilename());
        note.setFileType(file.getContentType());
        return noteRepository.save(note);
    }

    @Transactional
    public Note updateNote(UUID id, User user, String title, String content) {
        Note note = getNoteByIdAndUser(id, user);
        if (title != null) note.setTitle(title);
        if (content != null) note.setContent(content);
        return noteRepository.save(note);
    }

    @Transactional
    public void deleteNote(UUID id, User user) {
        Note note = getNoteByIdAndUser(id, user);
        noteRepository.delete(note);
    }

    @Transactional
    public NoteSummary summarizeNote(UUID id, User user) {
        Note note = getNoteByIdAndUser(id, user);
        if (note.getContent() == null || note.getContent().isBlank()) {
            throw new IllegalArgumentException("Note content is empty");
        }

        String prompt = "You are an AI study assistant. Read the following text and provide a concise summary, bullet points for revision notes, key concepts (keywords), formulas, and interview points. " +
                "Respond ONLY with a valid JSON object matching exactly this structure:\n" +
                "{\n" +
                "  \"summary\": \"A concise 2-3 sentence summary.\",\n" +
                "  \"bullet_points\": \"- Point 1\\n- Point 2 (Use markdown)\",\n" +
                "  \"keywords\": \"keyword1, keyword2, keyword3\",\n" +
                "  \"formulas\": \"- Formula 1: Explanation\\n- Formula 2 (Use markdown)\",\n" +
                "  \"interview_points\": \"- Q1: Answer\\n- Q2 (Use markdown)\"\n" +
                "}\n\n" +
                "Text to summarize: \n" + note.getContent();

        try {
            Map<String, Object> data = geminiService.generateJSONObjectContent(prompt);

            NoteSummary summary = note.getSummary();
            if (summary == null) {
                summary = new NoteSummary();
                summary.setNote(note);
            }

            summary.setSummary((String) data.getOrDefault("summary", "No summary available."));
            summary.setBulletPoints((String) data.getOrDefault("bullet_points", ""));
            summary.setKeywords((String) data.getOrDefault("keywords", ""));
            summary.setFormulas((String) data.getOrDefault("formulas", ""));
            summary.setInterviewPoints((String) data.getOrDefault("interview_points", ""));

            return noteSummaryRepository.save(summary);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate or parse AI summary", e);
        }
    }
}
