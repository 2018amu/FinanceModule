package com.company.account;


import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BankAccountService {

    private final BankAccountRepository repository;

    public BankAccountService(BankAccountRepository repository) {
        this.repository = repository;
    }

    public List<BankAccount> getAllBankAccounts() {
        return repository.findAll();
    }
}