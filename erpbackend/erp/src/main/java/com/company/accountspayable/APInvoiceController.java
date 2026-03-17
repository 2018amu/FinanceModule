package com.company.accountspayable;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ap")
@CrossOrigin
public class APInvoiceController {

    private final APInvoiceService service;

    public APInvoiceController(APInvoiceService service) {
        this.service = service;
    }

    @GetMapping
    public List<APInvoice> getAllInvoices() {
        return service.getAllInvoices();
    }

    @PostMapping
    public APInvoice createInvoice(@RequestBody APInvoice invoice) {
        return service.createInvoice(invoice);
    }

    @PutMapping("/pay/{id}")
    public APInvoice payInvoice(@PathVariable("id") Long id) {
        return service.payInvoice(id);
    }

    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable("id") Long id) {
        service.deleteInvoice(id);
    }

    @GetMapping("/vendors/count")
    public Long getVendorCount() {
        return service.count();
    }
    
    @PutMapping("/pay-all")
public List<APInvoice> payAllInvoices() {
    return service.payAllInvoices();
}
     

}