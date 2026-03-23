package com.company.modulesetup;

import jakarta.persistence.*;

@Entity
@Table(name = "module_setup")
public class ModuleSetup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fiscalYearStart;
    private String baseCurrency;
    private String taxId;
    private String accountingMethod;

    // Constructors
    public ModuleSetup() {
    }

    public ModuleSetup(String fiscalYearStart, String baseCurrency, String taxId, String accountingMethod) {
        this.fiscalYearStart = fiscalYearStart;
        this.baseCurrency = baseCurrency;
        this.taxId = taxId;
        this.accountingMethod = accountingMethod;
    }

    // ✅ ADD THIS
    public void setId(Long id) {
        this.id = id;
    }

    public String getFiscalYearStart() {
        return fiscalYearStart;
    }

    public void setFiscalYearStart(String fiscalYearStart) {
        this.fiscalYearStart = fiscalYearStart;
    }

    public String getBaseCurrency() {
        return baseCurrency;
    }

    public void setBaseCurrency(String baseCurrency) {
        this.baseCurrency = baseCurrency;
    }

    public String getTaxId() {
        return taxId;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public String getAccountingMethod() {
        return accountingMethod;
    }

    public void setAccountingMethod(String accountingMethod) {
        this.accountingMethod = accountingMethod;
    }
}