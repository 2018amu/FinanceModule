package com.company.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "domains")
public class Domain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String title;
    private String revenue;
    private String keyAccounts;
    private String apFocus;

    private boolean applies = false; 

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getRevenue() { return revenue; }
    public void setRevenue(String revenue) { this.revenue = revenue; }

    public String getKeyAccounts() { return keyAccounts; }
    public void setKeyAccounts(String keyAccounts) { this.keyAccounts = keyAccounts; }

    public String getApFocus() { return apFocus; }
    public void setApFocus(String apFocus) { this.apFocus = apFocus; }

    public boolean isApplies() { return applies; }
    public void setApplies(boolean applies) { this.applies = applies; }
}