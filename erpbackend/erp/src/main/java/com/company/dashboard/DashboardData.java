package com.company.dashboard;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class DashboardData {

    private Card totalRevenue;
    private Card accountsReceivable;
    private Card accountsPayable;
    private Card cashBalance;
    private List<PendingAction> pendingActions;

    // Getters and Setters
    public Card getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(Card totalRevenue) { this.totalRevenue = totalRevenue; }

    public Card getAccountsReceivable() { return accountsReceivable; }
    public void setAccountsReceivable(Card accountsReceivable) { this.accountsReceivable = accountsReceivable; }

    public Card getAccountsPayable() { return accountsPayable; }
    public void setAccountsPayable(Card accountsPayable) { this.accountsPayable = accountsPayable; }

    public Card getCashBalance() { return cashBalance; }
    public void setCashBalance(Card cashBalance) { this.cashBalance = cashBalance; }

    public List<PendingAction> getPendingActions() { return pendingActions; }
    public void setPendingActions(List<PendingAction> pendingActions) { this.pendingActions = pendingActions; }

    // 🔹 ENTITY MAPPING CLASSES

    @Entity
    @Table(name = "financial_summary")
    public static class Card {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String title;
        private BigDecimal value = BigDecimal.ZERO;
        private String trend = "none";
        private String trendValue = "0";
        private String icon = "";

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public BigDecimal getValue() { return value; }
        public void setValue(BigDecimal value) {
            this.value = (value != null) ? value : BigDecimal.ZERO;
        }

        public String getTrend() { return trend; }
        public void setTrend(String trend) { this.trend = trend; }

        public String getTrendValue() { return trendValue; }
        public void setTrendValue(String trendValue) { this.trendValue = trendValue; }

        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
    }

    @Entity
    @Table(name = "pending_actions")
    public static class PendingAction {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String action = "";
        private String module = "";
        private String priority = "Low";
        private LocalDate dueDate = LocalDate.now();
        private String status = "Pending";

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getAction() { return action; }
        public void setAction(String action) { this.action = action; }

        public String getModule() { return module; }
        public void setModule(String module) { this.module = module; }

        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }

        public LocalDate getDueDate() { return dueDate; }
        public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
