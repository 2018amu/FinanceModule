import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService, FinancialRecord } from '../../services/report.service';

type ReportTab = 'balancesheet' | 'incomestatement' | 'cashflow' | 'ratios';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financialreports.component.html'
})
export class FinancialreportsComponent implements OnInit {

  currentTab: ReportTab = 'balancesheet';
  records: FinancialRecord[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadData('balancesheet');
  }

  // calculate total by category
getTotal(category: string): number {
  return this.records
    ?.filter(r => r.category === category)
    .reduce((sum, r) => sum + r.amount, 0) || 0;
}
downloadReport(type: string) {
  console.log('Download report:', type);
}



// calculate total of all records
getTotalAll(): number {
  return this.records
    ?.reduce((sum, r) => sum + r.amount, 0) || 0;
}

  setTab(tab: ReportTab) {
    this.currentTab = tab;
    this.loadData(tab);
  }

  loadData(type: string) {
    this.reportService.getReport(type).subscribe({
      next: (data) => {
        this.records = data;
      },
      error: (err) => {
        console.error('Error loading data', err);
      }
    });
  }
}