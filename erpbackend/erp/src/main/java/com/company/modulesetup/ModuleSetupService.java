package com.company.modulesetup;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleSetupService {

    @Autowired
    private ModuleSetupRepository repository;

    // Save or Update
    public ModuleSetup saveSetup(ModuleSetup setup) {
        return repository.save(setup);
    }

    // Get All
    public List<ModuleSetup> getAll() {
        return repository.findAll();
    }

    // Get by ID
    public ModuleSetup getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Delete
    public void delete(Long id) {
        repository.deleteById(id);
    }
}