package com.company.fixedassets;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "fixed_assets")
public class FixedAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "asset_name")
    private String assetName;

    @Column(name = "category")
    private String category;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "purchase_value")
    private Double purchaseValue;

    @Column(name = "current_value")
    private Double currentValue;

    @Column(name = "status")
    private String status; // ACTIVE / DISPOSED

    @Column(name = "accumulated_depreciation")
    private Double accumulatedDepreciation;

    // Constructors
    public FixedAsset() {}

    public FixedAsset(String assetName, String category, LocalDate purchaseDate,
                      Double purchaseValue, Double currentValue,
                      String status, Double accumulatedDepreciation) {
        this.assetName = assetName;
        this.category = category;
        this.purchaseDate = purchaseDate;
        this.purchaseValue = purchaseValue;
        this.currentValue = currentValue;
        this.status = status;
        this.accumulatedDepreciation = accumulatedDepreciation;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public String getAssetName() { return assetName; }
    public void setAssetName(String assetName) { this.assetName = assetName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }

    public Double getPurchaseValue() { return purchaseValue; }
    public void setPurchaseValue(Double purchaseValue) { this.purchaseValue = purchaseValue; }

    public Double getCurrentValue() { return currentValue; }
    public void setCurrentValue(Double currentValue) { this.currentValue = currentValue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getAccumulatedDepreciation() { return accumulatedDepreciation; }
    public void setAccumulatedDepreciation(Double accumulatedDepreciation) {
        this.accumulatedDepreciation = accumulatedDepreciation;
    }
}