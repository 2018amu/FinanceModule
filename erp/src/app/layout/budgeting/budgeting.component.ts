import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface Budget{
  id:number
  accountName:string
  budgetAmount:number
  actualAmount:number
  variance:number
  percentUsed:number
  status:string
}

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budgeting.component.html'
})
export class BudgetComponent implements OnInit {

  currentTab: string = 'budgetplan';

  // table data used by your HTML
  budgetData:any[] = [];

  // summary cards
  totalBudget: number = 0;
  overBudgetCount: number = 0;
  budgetVariancePercent: number = 0;

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(){

    this.http.get<Budget[]>('http://localhost:8080/api/budgets')
    .subscribe({

      next:(data)=>{

        // convert backend format to frontend format
        this.budgetData = data.map(b => ({
          account: b.accountName,
          budget: b.budgetAmount,
          actual: b.actualAmount
        }));

        this.calculateSummary();
      },

      error:(err)=>{
        console.error("Error loading budgets",err);
      }

    });

  }

  calculateSummary(){

    this.totalBudget = this.budgetData
      .reduce((sum,item)=>sum + item.budget ,0);

    const totalActual = this.getTotalActual();

    if(this.totalBudget > 0){
      this.budgetVariancePercent = (totalActual / this.totalBudget) * 100;
    }

    this.overBudgetCount = this.budgetData
      .filter(item => item.actual > item.budget).length;

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