package com.company.budget;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="account_name")
    private String accountName;

    @Column(name="budget_amount")
    private BigDecimal budgetAmount;

    @Column(name="actual_amount")
    private BigDecimal actualAmount;

    @Column(name="variance")
    private BigDecimal variance;

    @Column(name="percent_used")
    private BigDecimal percentUsed;

    private String status;

    public Budget(){}

    public Long getId(){ return id; }

    public String getAccountName(){ return accountName; }
    public void setAccountName(String accountName){ this.accountName = accountName; }

    public BigDecimal getBudgetAmount(){ return budgetAmount; }
    public void setBudgetAmount(BigDecimal budgetAmount){ this.budgetAmount = budgetAmount; }

    public BigDecimal getActualAmount(){ return actualAmount; }
    public void setActualAmount(BigDecimal actualAmount){ this.actualAmount = actualAmount; }

    public BigDecimal getVariance(){ return variance; }
    public void setVariance(BigDecimal variance){ this.variance = variance; }

    public BigDecimal getPercentUsed(){ return percentUsed; }
    public void setPercentUsed(BigDecimal percentUsed){ this.percentUsed = percentUsed; }

    public String getStatus(){ return status; }
    public void setStatus(String status){ this.status = status; }
}