package com.company.budget;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.company.budget.Budget;
import com.company.budget.BudgetService;

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
    public Budget createBudget(@RequestBody Budget budget){
        return service.saveBudget(budget);
    }

    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id){
        service.deleteBudget(id);
        return "Budget deleted successfully";
    }
}