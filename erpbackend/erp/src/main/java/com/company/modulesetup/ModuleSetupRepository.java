package com.company.modulesetup;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleSetupRepository extends JpaRepository<ModuleSetup, Long> {
}