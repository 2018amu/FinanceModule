package com.company.dashboard;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;

@Service
public class DashboardService {

    public DashboardData getDashboardData() {
        DashboardData data = new DashboardData();

        // Total Revenue
        DashboardData.Card totalRevenue = new DashboardData.Card();
        totalRevenue.setTitle("Total Revenue");
        totalRevenue.setValue(BigDecimal.valueOf(12345.67));
        totalRevenue.setTrend("up");
        totalRevenue.setTrendValue("+12%");
        totalRevenue.setIcon("fas fa-dollar-sign");
        data.setTotalRevenue(totalRevenue);

        // Accounts Receivable
        DashboardData.Card accountsReceivable = new DashboardData.Card();
        accountsReceivable.setTitle("Accounts Receivable");
        accountsReceivable.setValue(BigDecimal.valueOf(8901.23));
        accountsReceivable.setTrend("down");
        accountsReceivable.setTrendValue("-5%");
        accountsReceivable.setIcon("fas fa-file-invoice");
        data.setAccountsReceivable(accountsReceivable);

        // Accounts Payable
        DashboardData.Card accountsPayable = new DashboardData.Card();
        accountsPayable.setTitle("Accounts Payable");
        accountsPayable.setValue(BigDecimal.valueOf(4567.89));
        accountsPayable.setTrend("up");
        accountsPayable.setTrendValue("+3%");
        accountsPayable.setIcon("fas fa-hand-holding-usd");
        data.setAccountsPayable(accountsPayable);

        // Cash Balance
        DashboardData.Card cashBalance = new DashboardData.Card();
        cashBalance.setTitle("Cash Balance");
        cashBalance.setValue(BigDecimal.valueOf(2345.67));
        cashBalance.setTrend("up");
        cashBalance.setTrendValue("+8%");
        cashBalance.setIcon("fas fa-wallet");
        data.setCashBalance(cashBalance);

        // Pending Actions
        DashboardData.PendingAction action1 = new DashboardData.PendingAction();
        action1.setAction("Approve Budget");
        action1.setModule("Finance");
        action1.setPriority("High");
        action1.setDueDate(LocalDate.now().plusDays(2));
        action1.setStatus("Pending");

        DashboardData.PendingAction action2 = new DashboardData.PendingAction();
        action2.setAction("Reconcile Accounts");
        action2.setModule("Accounting");
        action2.setPriority("Medium");
        action2.setDueDate(LocalDate.now().plusDays(5));
        action2.setStatus("In Progress");

        data.setPendingActions(Arrays.asList(action1, action2));

        return data;
    }
}