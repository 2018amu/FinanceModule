package com.company.budget;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class BudgetService {

    @Autowired
    private BudgetRepository repository;

    public List<Budget> getAllBudgets(){
        return repository.findAll();
    }

    public Budget saveBudget(Budget budget){
        return repository.save(budget);
    }

    public void deleteBudget(Long id){
        repository.deleteById(id);
    }
}