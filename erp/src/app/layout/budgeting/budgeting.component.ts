import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export interface Budget {
  id: number;
  accountName: string;
  budgetAmount: number;
  actualAmount: number;
  variance: number;
  percentUsed: number;
  status: string;
}

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgeting.component.html',
})
export class BudgetComponent implements OnInit {
  currentTab: string = 'budgetplan';

  // table data used by your HTML
  budgetData: any[] = [];
  
  

  // summary cards
  // totalBudget: number = 0;
  // overBudgetCount: number = 0;
  budgetVariancePercent: number = 0;
  newBudget: Partial<Budget> = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

 // When loading data, ensure all objects have `status`
 loadBudgets() {
  this.http.get<Budget[]>('http://localhost:8080/api/budgets').subscribe({
    next: (data) => {
      this.budgetData = data.map(b => ({
        id: b.id,
        account: b.accountName,
        budget: b.budgetAmount,
        actual: b.actualAmount,
        variance: b.budgetAmount - b.actualAmount,
        percentUsed: b.budgetAmount > 0 ? (b.actualAmount / b.budgetAmount) * 100 : 0,
        status:
          b.actualAmount > b.budgetAmount
            ? 'Over Budget'
            : b.actualAmount === b.budgetAmount
            ? 'On Budget'
            : 'Under Budget'
      }));

      this.computeSummaries();
    },
    error: (err) => console.error('Error loading budgets', err)
  });
}

  calculateSummary() {
    this.totalBudget = this.budgetData.reduce((sum, item) => sum + item.budget, 0);

    const totalActual = this.getTotalActual();

    if (this.totalBudget > 0) {
      this.budgetVariancePercent = (totalActual / this.totalBudget) * 100;
    }

    this.overBudgetCount = this.budgetData.filter((item) => item.actual > item.budget).length;
  }

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

  showBudgetModal: boolean = false;

  // newBudget: Budget = {
  //   id: 0,
  //   accountName: '',
  //   budgetAmount: 0,
  //   actualAmount: 0,
  //   variance: 0,
  //   percentUsed: 0,
  //   status: 'Active'
  // };
  createBudget() {
    this.showBudgetModal = true;
  }

  saveBudget() {
    // Trim account name
    const accountName = this.newBudget.accountName?.trim();

    // Frontend validation
    if (!accountName || accountName.length === 0) {
      alert('Please enter Account Name');
      return;
    }
    if (!this.newBudget.budgetAmount || this.newBudget.budgetAmount <= 0) {
      alert('Please enter a valid Budget Amount');
      return;
    }
    if (this.newBudget.actualAmount == null || this.newBudget.actualAmount < 0) {
      this.newBudget.actualAmount = 0;
    }

    // Prepare payload
    const payload = {
      accountName: accountName,
      budgetAmount: this.newBudget.budgetAmount,
      actualAmount: this.newBudget.actualAmount,
    };

    // POST request
    this.http.post('http://localhost:8080/api/budgets', payload).subscribe({
      next: (res) => {
        console.log('Budget created', res);

        // Close modal
        this.showBudgetModal = false;

        // Reload table data
        this.loadBudgets();

        // ✅ Reset newBudget properly
        this.newBudget = {}; // <-- reset as empty Partial object
      },
      error: (err) => {
        console.error('Error creating budget', err);
        alert('Failed to create budget. Please try again.');
      },
    });
  }

  // Call this on Cancel button to reset as well
  closeBudgetModal() {
    this.showBudgetModal = false;
    this.newBudget = {}; // <-- reset
  }

  selectedPreviousBudgetId: number | null = null; // store selected budget id

  copySelectedBudget() {
    if (!this.selectedPreviousBudgetId) {
      alert('Please select a budget to copy.');
      return;
    }

    const budgetToCopy = this.budgetData.find((b) => b.id === this.selectedPreviousBudgetId);
    if (!budgetToCopy) {
      alert('Selected budget not found.');
      return;
    }

    this.newBudget = {
      accountName: budgetToCopy.account,
      budgetAmount: budgetToCopy.budget,
      actualAmount: budgetToCopy.actual,
    };

    this.showBudgetModal = true;
  }


  // Summary counts
totalBudget: number = 0;
totalActual: number = 0;
overBudgetCount: number = 0;
onBudgetCount: number = 0;
underBudgetCount: number = 0;
totalVariance: number = 0;
averagePercentUsed: number = 0;

computeSummaries() {
  this.totalBudget = this.budgetData.reduce((sum, item) => sum + (item.budget ?? 0), 0);
  this.totalActual = this.budgetData.reduce((sum, item) => sum + (item.actual ?? 0), 0);
  this.totalVariance = this.budgetData.reduce((sum, item) => sum + (item.variance ?? 0), 0);
  this.averagePercentUsed =
    this.budgetData.length > 0
      ? this.budgetData.reduce((sum, item) => sum + (item.percentUsed ?? 0), 0) / this.budgetData.length
      : 0;

  this.overBudgetCount = this.budgetData.filter(item => (item.status ?? '') === 'Over Budget').length;
  this.onBudgetCount = this.budgetData.filter(item => (item.status ?? '') === 'On Budget').length;
  this.underBudgetCount = this.budgetData.filter(item => (item.status ?? '') === 'Under Budget').length;
}


  
  

  analyzeVariance() {
    if (!this.budgetData || this.budgetData.length === 0) {
      alert('No budget data to analyze.');
      return;
    }
  
    // Calculate variance, percentUsed, status safely
    this.budgetData = this.budgetData.map((item) => {
      const actual = item.actual ?? 0;      // default 0 if undefined
      const budget = item.budget ?? 0;      // default 0 if undefined
      const variance = actual - budget;
      const percentUsed = budget > 0 ? (actual / budget) * 100 : 0;
      const status =
        actual > budget ? 'Over Budget' : actual === budget ? 'On Budget' : 'Under Budget';
  
      return { ...item, variance, percentUsed, status };
    });
  
    // Totals for summary cards
    this.totalVariance = this.budgetData.reduce((sum, item) => sum + (item.variance ?? 0), 0);
    this.averagePercentUsed =
      this.budgetData.length > 0
        ? this.budgetData.reduce((sum, item) => sum + (item.percentUsed ?? 0), 0) / this.budgetData.length
        : 0;
  
    // Switch to Variance Details tab
    this.setTab('variancedetails');
  }
}
