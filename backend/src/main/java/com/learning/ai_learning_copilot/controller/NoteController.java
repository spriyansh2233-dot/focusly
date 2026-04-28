package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.Note;
import com.learning.ai_learning_copilot.model.NoteSummary;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public ResponseEntity<List<Note>> getNotes(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(noteService.getNotesForUser(user));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Note>> searchNotes(@AuthenticationPrincipal User user, @RequestParam String q) {
        return ResponseEntity.ok(noteService.searchNotes(user, q));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNote(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(noteService.getNoteByIdAndUser(id, user));
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@AuthenticationPrincipal User user, @RequestBody Map<String, String> payload) {
        String title = payload.get("title");
        String content = payload.get("content");
        return ResponseEntity.ok(noteService.createNote(user, title, content));
    }

    @PostMapping("/upload")
    public ResponseEntity<Note> uploadNote(@AuthenticationPrincipal User user, @RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(noteService.uploadNote(user, file));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable UUID id, @AuthenticationPrincipal User user, @RequestBody Map<String, String> payload) {
        String title = payload.get("title");
        String content = payload.get("content");
        return ResponseEntity.ok(noteService.updateNote(id, user, title, content));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        noteService.deleteNote(id, user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/summarize")
    public ResponseEntity<NoteSummary> summarizeNote(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(noteService.summarizeNote(id, user));
    }
}
