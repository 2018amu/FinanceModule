package com.company.accountsreceivable;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ar") 
@CrossOrigin
public class ARInvoiceController {

    private final ARInvoiceService service;

    public ARInvoiceController(ARInvoiceService service) {
        this.service = service;
    }

    // Get all invoices
    @GetMapping("/invoices")
    public List<ARInvoice> getAllInvoices() {
        return service.getAllInvoices();
    }

    // Create new invoice
    @PostMapping("/invoices")
    public ARInvoice createInvoice(@RequestBody ARInvoice invoice) {
        return service.createInvoice(invoice);
    }

    @PutMapping("/{id}/pay")
    public ARInvoice recordPayment(
        @PathVariable("id") Long id,
            @RequestBody Map<String, Double> payload  // Receive amount in JSON
    ) {
        Double amount = payload.get("amount");
        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("Invalid payment amount");
        }
        return service.recordPayment(id, amount);
    }

    // Pay all invoices
    @PutMapping("/invoices/payall")
    public void payAllInvoices() {
        service.payAllInvoices();
    }

    // Send reminders
    @PostMapping("/invoices/send-reminders")
    public void sendReminders() {
        service.sendReminders();
    }

    // Count customers
    @GetMapping("/customers/count")
    public Long getCustomerCount() {
        return service.countCustomers();
    }

    // Delete invoice
    @DeleteMapping("/invoices/{id}")
    public void deleteInvoice(@PathVariable Long id) {
        service.deleteInvoice(id);
    }
}