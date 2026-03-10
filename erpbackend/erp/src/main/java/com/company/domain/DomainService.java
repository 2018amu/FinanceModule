package com.company.domain;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DomainService {

    private final DomainRepository repository;

    public DomainService(DomainRepository repository) {
        this.repository = repository;
    }

    public List<Domain> getAllDomains() {
        return repository.findAll();
    }

    public Domain getDomainByName(String name) {
        return repository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Domain not found"));
    }

    public Domain applyDomainSettings(String name) {
        Domain domain = getDomainByName(name);
        domain.setApplies(true);  // mark as applied
        return repository.save(domain);
    }
}