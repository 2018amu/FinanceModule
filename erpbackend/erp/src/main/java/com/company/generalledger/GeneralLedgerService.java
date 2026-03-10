package com.company.generalledger;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GeneralLedgerService {

    private final GeneralLedgerRepository repository;

    public GeneralLedgerService(GeneralLedgerRepository repository) {
        this.repository = repository;
    }

    public List<GeneralLedger> getAllJournals() {
        return repository.findAll();
    }

    public GeneralLedger saveJournal(GeneralLedger journal) {
        return repository.save(journal);
    }

    public List<GeneralLedger> getLedgerEntries() {
        return repository.findAll();
    }
    public GeneralLedger getJournalById(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journal not found with id: " + id));
    }
    @Transactional
    public List<GeneralLedger> runMonthEndClose() {
        // 1. Get all Posted journals
        List<GeneralLedger> postedJournals = repository.findByStatus("Posted");

        // 2. Mark them as Closed
        for (GeneralLedger j : postedJournals) {
            j.setStatus("Closed");
        }

        // 3. Save changes
        return repository.saveAll(postedJournals);
    }
    

}