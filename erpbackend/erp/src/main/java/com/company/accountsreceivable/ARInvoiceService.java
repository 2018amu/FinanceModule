package com.company.accountsreceivable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ARInvoiceService {

    private final ARInvoiceRepository repository;

    public ARInvoiceService(ARInvoiceRepository repository) {
        this.repository = repository;
    }

    // Get all invoices
    public List<ARInvoice> getAllInvoices() {
        return repository.findAll();
    }

// Record payment for a single invoice
@Transactional
public ARInvoice recordPayment(Long invoiceId, Double amount) {
    ARInvoice invoice = repository.findById(invoiceId)
            .orElseThrow(() -> new RuntimeException("Invoice not found"));

    // Convert to BigDecimal
    BigDecimal currentBalance = invoice.getBalance();
    BigDecimal paymentAmount = BigDecimal.valueOf(amount);

    // Subtract payment
    BigDecimal newBalance = currentBalance.subtract(paymentAmount);
    invoice.setBalance(newBalance);

    // Update status
    if (newBalance.compareTo(BigDecimal.ZERO) <= 0) {
        invoice.setStatus("PAID");
        invoice.setBalance(BigDecimal.ZERO); // prevent negative
    } else {
        invoice.setStatus("PARTIAL");
    }

   ARInvoice updatedInvoice = repository.save(invoice);
return updatedInvoice;
}

    // Pay all invoices
    @Transactional
    public void payAllInvoices() {
        List<ARInvoice> invoices = repository.findAll();
        for (ARInvoice inv : invoices) {
            inv.setBalance(BigDecimal.ZERO);
            inv.setStatus("PAID");
        }
        repository.saveAll(invoices);
    }

    // Send reminders (dummy example, extend with email service)
    public void sendReminders() {
        List<ARInvoice> overdueInvoices = repository.findByStatus("OVERDUE");
        for (ARInvoice inv : overdueInvoices) {
            // Integrate your email service here
            System.out.println("Reminder sent for invoice: " + inv.getInvoiceNumber());
        }
    }

    // Count customers
    public Long countCustomers() {
        return repository.count();
    }

    // Add new invoice
    public ARInvoice createInvoice(ARInvoice invoice) {
        if (invoice.getBalance() == null) {
            invoice.setBalance(invoice.getAmount()); // set initial balance
        }
        if (invoice.getStatus() == null) {
            invoice.setStatus("PENDING"); // default status
        }
        return repository.save(invoice);
    }

    // Delete invoice
    public void deleteInvoice(Long id) {
        repository.deleteById(id);
    }
}