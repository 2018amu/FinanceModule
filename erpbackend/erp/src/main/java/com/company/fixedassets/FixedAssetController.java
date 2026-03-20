package com.company.fixedassets;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assets")

public class FixedAssetController {

    private final FixedAssetService service;

    public FixedAssetController(FixedAssetService service) {
        this.service = service;
    }

    // Add Asset
    @PostMapping
    public FixedAsset addAsset(@RequestBody FixedAsset asset) {
        return service.addAsset(asset);
    }

    // Get All
    @GetMapping
    public List<FixedAsset> getAllAssets() {
        return service.getAllAssets();
    }

    // Run Depreciation
    @PostMapping("/depreciation")
    public List<FixedAsset> runDepreciation() {
        return service.runDepreciation();
    }

    @DeleteMapping("/{id}")
    public void deleteAsset(@PathVariable("id") Long id) {
        System.out.println("Deleting asset with id: " + id);
        service.deleteAsset(id);
    }

    // Dashboard Summary
    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalAssetsValue", service.getTotalAssetValue());
        summary.put("totalDepreciation", service.getTotalDepreciation());
        summary.put("netBookValue", service.getNetBookValue());
        summary.put("activeAssetsCount", service.getActiveAssetCount());

        return summary;
    }
}