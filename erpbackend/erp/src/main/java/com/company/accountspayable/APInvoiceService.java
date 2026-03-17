package com.company.accountspayable;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class APInvoiceService {

    private final APInvoiceRepository repository;

    public APInvoiceService(APInvoiceRepository repository) {
        this.repository = repository;
    }

    public List<APInvoice> getAllInvoices() {
        return repository.findAll();
    }

    public APInvoice createInvoice(APInvoice invoice) {
        invoice.setStatus("PENDING");
        return repository.save(invoice);
    }

    public APInvoice payInvoice(Long id) {
        return repository.findById(id)
                .map(invoice -> {
                    invoice.setStatus("PAID");
                    return repository.save(invoice);
                })
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
    }

    public void deleteInvoice(Long id) {
        repository.deleteById(id);
    }

    public Long count() {
        return repository.count(); // counts all vendor records
    }

    public List<APInvoice> payAllInvoices() {
        List<APInvoice> invoices = repository.findAll();
    
        invoices.forEach(inv -> {
            if (!"PAID".equalsIgnoreCase(inv.getStatus())) {
                inv.setStatus("PAID");
            }
        });
    
        return repository.saveAll(invoices);
    }

}