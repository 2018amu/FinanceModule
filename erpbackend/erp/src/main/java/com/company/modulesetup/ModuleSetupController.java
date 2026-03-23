package com.company.modulesetup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/setup")
@CrossOrigin
public class ModuleSetupController {

    @Autowired
    private ModuleSetupService service;

    // Save Setup
    @PostMapping
    public ModuleSetup save(@RequestBody ModuleSetup setup) {
        return service.saveSetup(setup);
    }

    // Get All
    @GetMapping
    public List<ModuleSetup> getAll() {
        return service.getAll();
    }

    // Get By ID
    @GetMapping("/{id}")
    public ModuleSetup getById(@PathVariable("id") Long id) {
        return service.getById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}")
    public ModuleSetup update(@PathVariable("id") Long id, @RequestBody ModuleSetup setup) {
        setup.setId(id);
        return service.saveSetup(setup);
    }
}