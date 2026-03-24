package com.company.reports;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final FinancialRecordRepository repository;

    public ReportService(FinancialRecordRepository repository) {
        this.repository = repository;
    }

    // Get records by report type
    public List<FinancialRecord> getReport(String type) {
        return repository.findByType(type);
    }

    // Save new financial record
    public FinancialRecord saveRecord(FinancialRecord record) {
        return repository.save(record);
    }

    // Delete record
    public void deleteRecord(Long id) {
        repository.deleteById(id);
    }
}