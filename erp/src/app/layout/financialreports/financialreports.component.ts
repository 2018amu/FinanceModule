import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financialreports.component.html'
})
export class FinancialreportsComponent {

  currentTab: string = 'balancesheet';

  setTab(tab: string) {
    this.currentTab = tab;
  }

}
