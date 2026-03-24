package com.company.reports;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportService service;

    public ReportController(ReportService service) {
        this.service = service;
    }

    //  Get report data
    @GetMapping("/{type}")
    public List<FinancialRecord> getReport(@PathVariable String type) {
        return service.getReport(type);
    }

    //  Add new record
    @PostMapping
    public FinancialRecord addRecord(@RequestBody FinancialRecord record) {
        return service.saveRecord(record);
    }

    //  Delete record
    @DeleteMapping("/{id}")
    public String deleteRecord(@PathVariable Long id) {
        service.deleteRecord(id);
        return "Record deleted successfully";
    }
}