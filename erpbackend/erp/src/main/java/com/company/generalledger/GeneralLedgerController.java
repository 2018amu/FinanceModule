
package com.company.generalledger;


import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/gl")
@CrossOrigin(origins = "*")
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
    

    // Ledger entries
    @GetMapping("/ledger")
    public List<GeneralLedger> getLedger() {
        return service.getLedgerEntries();
    }

}