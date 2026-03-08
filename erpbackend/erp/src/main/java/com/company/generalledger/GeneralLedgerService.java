package com.company.generalledger;


import org.springframework.stereotype.Service;

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

}