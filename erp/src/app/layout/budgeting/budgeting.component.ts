import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budgeting.component.html'
})
export class BudgetComponent {

  currentTab: string = 'budgetplan';

  totalBudget: number = 450000;
  overBudgetCount: number = 3;
  budgetVariancePercent: number = 95.2;

  budgetData = [
    { account: 'Marketing', budget: 120000, actual: 110000 },
    { account: 'Operations', budget: 150000, actual: 165000 },
    { account: 'HR', budget: 80000, actual: 76000 },
    { account: 'IT Infrastructure', budget: 100000, actual: 98000 }
  ];

  setTab(tab: string) {
    this.currentTab = tab;
  }

  getStatus(item: any): string {
    if (item.actual > item.budget) return 'Over Budget';
    if (item.actual === item.budget) return 'On Budget';
    return 'Under Budget';
  }

  getTotalActual(): number {
    return this.budgetData.reduce((sum, item) => sum + item.actual, 0);
  }

  createBudget() {
    alert('Create Budget clicked');
  }

  copyBudget() {
    alert('Copy Budget clicked');
  }

  analyzeVariance() {
    alert('Variance Analysis clicked');
  }
}
