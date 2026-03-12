package com.company.account;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/bank-accounts")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class BankAccountController {

    private final BankAccountService service;

    public BankAccountController(BankAccountService service) {
        this.service = service;
    }

    // Get all bank accounts
    @GetMapping
    public List<BankAccount> getAll() {
        return service.getAllBankAccounts();
    }

    // Save bank account
    @PostMapping
    public BankAccount save(@RequestBody BankAccount bankAccount) {
        return service.saveBankAccount(bankAccount);
    }

    // Import bank statement file
    @PostMapping("/import")
    public String importBankStatement(@RequestParam("file") MultipartFile file) {
        try {
            service.importBankStatement(file); // call service to handle CSV
            return "Bank statement imported successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Import failed: " + e.getMessage();
        }
    }
    @PostMapping("/reconcile")
public String reconcileBankAccounts() {
    List<BankAccount> accounts = service.getAllBankAccounts();
    for (BankAccount account : accounts) {
        account.setStatus("Reconciled");
        account.setLastUpdated(LocalDate.now());
        service.saveBankAccount(account);
    }
    return "Reconciliation completed successfully";
}
@DeleteMapping("/{id}")
    public String deleteBank(@PathVariable("id") Long id) {
        service.deleteBankAccount(id);
        return "Bank account deleted successfully";
    }
}