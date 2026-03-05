package com.company.chartofaccounts;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "chart_of_accounts")
public class ChartOfAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="account_code")
    @JsonProperty("account_code")
    private String accountCode;

    @Column(name="account_name")
    @JsonProperty("account_name")
    private String accountName;

    @Column(name="type")
    private String type;

    @Column(name="sub_type")
    @JsonProperty("sub_type")
    private String subType;

    @Column(name="balance")
    private Double balance;

    @Column(name="status")
    private String status;

    public ChartOfAccount(){}

    public Long getId(){ return id; }

    public String getAccountCode(){ return accountCode; }
    public void setAccountCode(String accountCode){ this.accountCode = accountCode; }

    public String getAccountName(){ return accountName; }
    public void setAccountName(String accountName){ this.accountName = accountName; }

    public String getType(){ return type; }
    public void setType(String type){ this.type = type; }

    public String getSubType(){ return subType; }
    public void setSubType(String subType){ this.subType = subType; }

    public Double getBalance(){ return balance; }
    public void setBalance(Double balance){ this.balance = balance; }

    public String getStatus(){ return status; }
    public void setStatus(String status){ this.status = status; }
}