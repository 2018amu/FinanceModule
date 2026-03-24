package com.company.reports;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FinancialRecordRepository extends JpaRepository<FinancialRecord, Long> {

    List<FinancialRecord> findByType(String type);
}