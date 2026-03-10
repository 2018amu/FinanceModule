package com.company.domain;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/domains")
@CrossOrigin(origins = "http://localhost:4200")
public class DomainController {

    private final DomainService service;

    public DomainController(DomainService service) {
        this.service = service;
    }

    @GetMapping
    public List<Domain> getDomains() {
        return service.getAllDomains();
    }

    @GetMapping("/{name}")
    public Domain getDomain(@PathVariable String name) {
        return service.getDomainByName(name);
    }

    @PostMapping("/apply/{name}")
    public Domain applyDomain(@PathVariable String name) {
        return service.applyDomainSettings(name);
    }
}