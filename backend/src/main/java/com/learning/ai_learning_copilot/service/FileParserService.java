package com.learning.ai_learning_copilot.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class FileParserService {

    public String extractText(MultipartFile file) throws Exception {
        String fileName = file.getOriginalFilename();
        if (fileName == null) return "";

        String lowerCaseFileName = fileName.toLowerCase();
        
        if (lowerCaseFileName.endsWith(".txt")) {
            return new String(file.getBytes(), StandardCharsets.UTF_8);
        } else if (lowerCaseFileName.endsWith(".pdf")) {
            return parsePdf(file.getInputStream());
        } else if (lowerCaseFileName.endsWith(".docx")) {
            return parseDocx(file.getInputStream());
        } else {
            throw new IllegalArgumentException("Unsupported file type: " + fileName);
        }
    }

    private String parsePdf(InputStream inputStream) throws Exception {
        try (PDDocument document = Loader.loadPDF(inputStream.readAllBytes())) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document);
        }
    }

    private String parseDocx(InputStream inputStream) throws Exception {
        try (XWPFDocument document = new XWPFDocument(inputStream);
             XWPFWordExtractor extractor = new XWPFWordExtractor(document)) {
            return extractor.getText();
        }
    }
}
