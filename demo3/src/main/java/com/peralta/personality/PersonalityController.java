package com.peralta.personality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/peralta/personalities")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonalityController {

    @Autowired
    private PersonalityRepository personalityRepository;

    // GET /surname/personalities
    @GetMapping
    public ResponseEntity<List<Personality>> getAllPersonalities() {
        List<Personality> personalities = personalityRepository.findAll();
        return ResponseEntity.ok(personalities);
    }

    // POST /surname/personalities
    @PostMapping
    public ResponseEntity<Personality> addPersonality(@RequestBody Personality personality) {
        Personality saved = personalityRepository.save(personality);
        return ResponseEntity.ok(saved);
    }

    // POST /surname/personalities/bulk
    @PostMapping("/bulk")
    public ResponseEntity<List<Personality>> addPersonalitiesBulk(@RequestBody List<Personality> personalities) {
        List<Personality> savedList = personalityRepository.saveAll(personalities);
        return ResponseEntity.ok(savedList);
    }
}