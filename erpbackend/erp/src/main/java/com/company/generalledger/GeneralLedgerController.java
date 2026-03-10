package com.company.generalledger;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gl")
@CrossOrigin(origins = "http://localhost:4200")
public class GeneralLedgerController {

    private final GeneralLedgerService service;

    public GeneralLedgerController(GeneralLedgerService service) {
        this.service = service;
    }

    // Get all journal entries
    @GetMapping("/journals")
    public List<GeneralLedger> getJournals() {
        return service.getAllJournals();
    }

    // Create journal entry
    @PostMapping("/journals")
    public GeneralLedger createJournal(@RequestBody GeneralLedger journal) {
        return service.saveJournal(journal);
    }

    // Approve journal
    @PutMapping("/journals/approve/{id}")
    public ResponseEntity<?> approveJournal(@PathVariable("id") Long id) {
        GeneralLedger journal = service.getJournalById(id);
        if (journal == null) {
            return ResponseEntity.status(404).body("Journal not found");
        }
        journal.setStatus("Approved");
        service.saveJournal(journal);
        return ResponseEntity.ok(journal);
    }

    // Post journal
    @PutMapping("/journals/post/{id}")
    public ResponseEntity<?> postJournal(@PathVariable("id") Long id) {
        GeneralLedger journal = service.getJournalById(id);
        if (journal == null) {
            return ResponseEntity.status(404).body("Journal not found");
        }
        journal.setStatus("Posted");
        service.saveJournal(journal);
        return ResponseEntity.ok(journal);
    }

    // Ledger entries
    @GetMapping("/ledger")
    public List<GeneralLedger> getLedger() {
        return service.getLedgerEntries();
    }

    @PostMapping("/month-end-close")
    public ResponseEntity<?> runMonthEndClose() {
        List<GeneralLedger> closedJournals = service.runMonthEndClose();

        if (closedJournals.isEmpty()) {
            return ResponseEntity.ok("No Posted journals to close.");
        }

        return ResponseEntity.ok(closedJournals);
    }
}