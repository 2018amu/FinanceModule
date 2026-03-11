import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BankAccount {
  accountName: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  currentBalance: number;
  lastUpdated: string;
  status: string;
}

@Component({
  selector: 'app-bankandreconciliation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bankandreconciliation.component.html',
  styleUrls: ['./bankandreconciliation.component.css']
})
export class BankandreconciliationComponent {

  currentTab: string = 'bankaccounts';

  totalBankBalance: number = 0;
  unreconciledCount: number = 0;
  lastReconciliation: string = '';
  bankAccountsCount: number = 0;

  // Empty array (no sample data)
  bankAccounts: any[] = [];

  setTab(tab: string) {
    this.currentTab = tab;
  }
  trackByAccount(index: number, bank: any) {
    return bank.id;
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

  editBank(bank: BankAccount) {
    alert(`Edit ${bank.accountName}`);
  }

  deleteBank(bank: BankAccount) {
    const confirmDelete = confirm(`Delete ${bank.accountName}?`);

    if (confirmDelete) {
      this.bankAccounts = this.bankAccounts.filter(
        acc => acc.accountNumber !== bank.accountNumber
      );
      this.bankAccountsCount = this.bankAccounts.length;
    }
  }

}