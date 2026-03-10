package com.company.generalledger;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GeneralLedgerRepository extends JpaRepository<GeneralLedger, Long> {
    List<GeneralLedger> findByStatus(String status);
}