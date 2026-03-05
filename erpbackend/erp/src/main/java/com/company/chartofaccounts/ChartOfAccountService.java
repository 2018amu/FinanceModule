package com.company.chartofaccounts;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChartOfAccountService {

    @Autowired
    private ChartOfAccountRepository repo;

    // Get all accounts
    public List<ChartOfAccount> getAllAccounts() {
        return repo.findAll();
    }

    // Save new or update existing account
    public ChartOfAccount saveAccount(ChartOfAccount account) {
        return repo.save(account);
    }

    // Get account by ID as Optional
    public Optional<ChartOfAccount> getAccountOptionalById(Long id) {
        return repo.findById(id);
    }

    // Get account by ID directly (nullable)
    public ChartOfAccount getAccountById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Delete account by ID
    public void deleteAccount(Long id) {
        repo.deleteById(id);
    }
}