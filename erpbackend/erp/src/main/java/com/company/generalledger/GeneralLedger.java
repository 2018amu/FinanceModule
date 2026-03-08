package com.company.generalledger;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "general_ledger")
public class GeneralLedger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String journalNo;

    private String description;

    private String account;

    private double debit;

    private double credit;

    private String status;

    public GeneralLedger() {
    }

    public GeneralLedger(LocalDate date, String journalNo, String description,
                         String account, double debit, double credit, String status) {
        this.date = date;
        this.journalNo = journalNo;
        this.description = description;
        this.account = account;
        this.debit = debit;
        this.credit = credit;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getJournalNo() {
        return journalNo;
    }

    public String getDescription() {
        return description;
    }

    public String getAccount() {
        return account;
    }

    public double getDebit() {
        return debit;
    }

    public double getCredit() {
        return credit;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setJournalNo(String journalNo) {
        this.journalNo = journalNo;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public void setDebit(double debit) {
        this.debit = debit;
    }

    public void setCredit(double credit) {
        this.credit = credit;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}