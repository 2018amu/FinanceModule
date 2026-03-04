import { Component } from '@angular/core'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-bankandreconciliation',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './bankandreconciliation.component.html',
  styleUrl: './bankandreconciliation.component.css',
})
export class BankandreconciliationComponent {
  currentTab: string = 'bankaccounts';

  totalBankBalance: number = 125420;
  unreconciledCount: number = 18;
  lastReconciliation: string = 'Oct 25, 2023';
  bankAccountsCount: number = 4;

  bankAccounts = [
    {
      accountName: 'Main Account',
      bankName: 'Bank A',
      accountNumber: '1234567890',
      accountType: 'Checking',
      currentBalance: 50000,
      lastUpdated: 'Feb 15, 2026',
      status: 'Active'
    },
    {
      accountName: 'Savings Account',
      bankName: 'Bank B',
      accountNumber: '9876543210',
      accountType: 'Savings',
      currentBalance: 75420,
      lastUpdated: 'Feb 14, 2026',
      status: 'Active'
    }
  ];
  setTab(tab: string) {
    this.currentTab = tab;
  }

  addBankAccount() {
    alert('Add Bank Account clicked');
  }

  importBankStatement() {
    alert('Import Bank Statement clicked');
  }

  reconcileAccount() {
    alert('Reconcile Account clicked');
  }

  editBank(bank: any) {
    alert(`Edit ${bank.accountName}`);
  }

  deleteBank(bank: any) {
    alert(`Delete ${bank.accountName}`);
  }

}
