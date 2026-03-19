package com.company.fixedassets;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FixedAssetService {

    private final FixedAssetRepository repository;

    public FixedAssetService(FixedAssetRepository repository) {
        this.repository = repository;
    }

    // Create Asset
    public FixedAsset addAsset(FixedAsset asset) {
        asset.setCurrentValue(asset.getPurchaseValue());
        asset.setAccumulatedDepreciation(0.0);
        asset.setStatus("ACTIVE");
        return repository.save(asset);
    }

    // Get All Assets
    public List<FixedAsset> getAllAssets() {
        return repository.findAll();
    }

    // Get Active Assets
    public List<FixedAsset> getActiveAssets() {
        return repository.findByStatus("ACTIVE");
    }

    // Delete Asset
    public void deleteAsset(Long id) {
        repository.deleteById(id);
    }

    // Run Depreciation (Simple Logic)
    public List<FixedAsset> runDepreciation() {
        List<FixedAsset> assets = repository.findAll();

        for (FixedAsset asset : assets) {
            double depreciation = asset.getPurchaseValue() * 0.10; // 10% yearly
            double newValue = asset.getCurrentValue() - depreciation;

            asset.setCurrentValue(Math.max(newValue, 0));
            asset.setAccumulatedDepreciation(
                    asset.getAccumulatedDepreciation() + depreciation
            );
        }

        return repository.saveAll(assets);
    }

    // Summary Data (for cards)
    public double getTotalAssetValue() {
        return repository.findAll()
                .stream()
                .mapToDouble(FixedAsset::getPurchaseValue)
                .sum();
    }

    public double getTotalDepreciation() {
        return repository.findAll()
                .stream()
                .mapToDouble(FixedAsset::getAccumulatedDepreciation)
                .sum();
    }

    public double getNetBookValue() {
        return repository.findAll()
                .stream()
                .mapToDouble(FixedAsset::getCurrentValue)
                .sum();
    }

    public long getActiveAssetCount() {
        return repository.findByStatus("ACTIVE").size();
    }
}