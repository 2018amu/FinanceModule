package com.company.chartofaccounts;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coa")
@CrossOrigin
public class ChartOfAccountController {

    @Autowired
    private ChartOfAccountService service;

    @GetMapping
    public List<ChartOfAccount> getAllAccounts() {
        return service.getAllAccounts();
    }

    @PostMapping
    public ResponseEntity<ChartOfAccount> createAccount(@RequestBody ChartOfAccount account) {
        try {
            ChartOfAccount saved = service.saveAccount(account);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChartOfAccount> getAccount(@PathVariable Long id) {
        Optional<ChartOfAccount> existing = service.getAccountOptionalById(id);
        if (!existing.isPresent()) { // <-- replace isEmpty() with !isPresent()
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(existing.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable("id") Long id, @RequestBody ChartOfAccount updatedAccount) {
        try {
            ChartOfAccount existing = service.getAccountById(id);
            if (existing == null)
                throw new RuntimeException("Account not found with ID: " + id);

            existing.setAccountCode(updatedAccount.getAccountCode());
            existing.setAccountName(updatedAccount.getAccountName());
            existing.setType(updatedAccount.getType());
            existing.setSubType(updatedAccount.getSubType());
            existing.setBalance(updatedAccount.getBalance());
            existing.setStatus(updatedAccount.getStatus());

            ChartOfAccount saved = service.saveAccount(existing);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace(); // prints stack trace to server console
            return ResponseEntity.status(500).body("Update failed: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable("id") Long id) {
        try {
            service.deleteAccount(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace(); // prints stack trace to server console
            return ResponseEntity.status(500).body("Delete failed: " + e.getMessage());
        }
    }

}