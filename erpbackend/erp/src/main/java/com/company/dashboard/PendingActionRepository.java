package com.company.dashboard;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingActionRepository
        extends JpaRepository<DashboardData.PendingAction, Long> {
}