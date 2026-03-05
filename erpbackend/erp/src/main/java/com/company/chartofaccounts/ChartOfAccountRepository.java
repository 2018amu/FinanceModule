package com.company.chartofaccounts;

import org.springframework.data.jpa.repository.JpaRepository;
import com.company.chartofaccounts.ChartOfAccount;

public interface ChartOfAccountRepository extends JpaRepository<ChartOfAccount, Long> {

}