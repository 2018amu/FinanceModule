package com.company.account;

import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class BankAccountService {

    private final BankAccountRepository repository;

    public BankAccountService(BankAccountRepository repository) {
        this.repository = repository;
    }

    public List<BankAccount> getAllBankAccounts() {
        return repository.findAll();
    }

    public BankAccount saveBankAccount(BankAccount bank) {
        return repository.save(bank);
    }
    public void deleteBankAccount(Long id) {
        repository.deleteById(id);
    }
    public void importBankStatement(MultipartFile file) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] fields = line.split(","); // CSV: accountName,bankName,accountNumber,accountType,currentBalance,lastUpdated,status
                BankAccount account = new BankAccount();
                account.setAccountName(fields[0]);
                account.setBankName(fields[1]);
                account.setAccountNumber(fields[2]);
                account.setAccountType(fields[3]);
                account.setCurrentBalance(new BigDecimal(fields[4]));
                account.setLastUpdated(LocalDate.parse(fields[5])); // yyyy-MM-dd format in CSV
                account.setStatus(fields[6]);
                repository.save(account);
            }
        }
    }
}

   
