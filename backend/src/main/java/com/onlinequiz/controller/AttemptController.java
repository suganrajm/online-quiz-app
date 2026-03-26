package com.onlinequiz.controller;

import com.onlinequiz.dto.AttemptDTO;
import com.onlinequiz.service.AttemptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attempts")
public class AttemptController {

    private final AttemptService attemptService;

    public AttemptController(AttemptService attemptService) {
        this.attemptService = attemptService;
    }

    @PostMapping("/submit")
    public ResponseEntity<AttemptDTO.AttemptResult> submitAttempt(@RequestBody AttemptDTO.SubmitAttemptRequest request) {
        return ResponseEntity.ok(attemptService.submitAttempt(request));
    }

    @GetMapping("/{attemptId}")
    public ResponseEntity<AttemptDTO.AttemptResult> getResult(@PathVariable Long attemptId) {
        return ResponseEntity.ok(attemptService.getAttemptResult(attemptId));
    }

    @GetMapping("/my")
    public ResponseEntity<List<AttemptDTO.AttemptResult>> getMyAttempts() {
        return ResponseEntity.ok(attemptService.getUserAttempts());
    }
}
