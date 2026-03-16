package com.company.budget;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.math.RoundingMode;



@RestController
@RequestMapping("/api/budgets")
@CrossOrigin
public class BudgetController {

    @Autowired
    private BudgetService service;

    @GetMapping
    public List<Budget> getAllBudgets(){
        return service.getAllBudgets();
    }

    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
    
        // Validate required fields
        if (budget.getAccountName() == null || budget.getAccountName().isEmpty()) {
            throw new IllegalArgumentException("Account name is required");
        }
        if (budget.getBudgetAmount() == null || budget.getBudgetAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Budget amount must be greater than 0");
        }
        if (budget.getActualAmount() == null) {
            budget.setActualAmount(BigDecimal.ZERO);
        }
    
        // Calculate variance
        BigDecimal variance = budget.getBudgetAmount().subtract(budget.getActualAmount());
        budget.setVariance(variance);
    
        // Calculate percent used safely
        BigDecimal percentUsed = BigDecimal.ZERO;
        if (budget.getBudgetAmount().compareTo(BigDecimal.ZERO) > 0) {
            percentUsed = budget.getActualAmount()
                    .multiply(BigDecimal.valueOf(100))
                    .divide(budget.getBudgetAmount(), 2, RoundingMode.HALF_UP);
        }
        budget.setPercentUsed(percentUsed);
    
        // Set default status
        budget.setStatus("Active");
    
        // Save to database
        return service.createBudget(budget);
    }
    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id){
        service.deleteBudget(id);
        return "Budget deleted successfully";
    }
}