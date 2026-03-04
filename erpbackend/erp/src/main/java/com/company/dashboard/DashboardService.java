package com.company.dashboard;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {
    private final CardRepository cardRepo;
    private final PendingActionRepository pendingRepo;

    public DashboardService(CardRepository cardRepo, PendingActionRepository pendingRepo) {
        this.cardRepo = cardRepo;
        this.pendingRepo = pendingRepo;
    }

    public DashboardData getDashboardData() {

        DashboardData data = new DashboardData();

        List<DashboardData.Card> cards = cardRepo.findAll();

        for (DashboardData.Card card : cards) {

            switch (card.getTitle()) {

                case "Total Revenue":
                    data.setTotalRevenue(card);
                    break;

                case "Accounts Receivable":
                    data.setAccountsReceivable(card);
                    break;

                case "Accounts Payable":
                    data.setAccountsPayable(card);
                    break;

                case "Cash Balance":
                    data.setCashBalance(card);
                    break;
            }
        }

        data.setPendingActions(pendingRepo.findAll());

        return data;
    }

    public List<DashboardData.PendingAction> updatePendingActions(List<DashboardData.PendingAction> actions) {
        return pendingRepo.saveAll(actions);
    }
}
