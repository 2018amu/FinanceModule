import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Account {
  id: number;
  code: string;
  name: string;
  type: string;
  subtype: string;
  balance: number;
  status: string;
}

@Component({
  selector: 'app-chart-of-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chartofaccounts.component.html',
  styleUrls: ['./chartofaccounts.component.css'],
  providers: [DecimalPipe]
})
export class ChartOfAccountsComponent {

  currentTab: 'accounts' | 'hierarchy' | 'balances' = 'accounts';

  searchText: string = '';
  filterType: string = 'all';
  filterStatus: string = 'all';

  accounts: Account[] = [];

  constructor() {
    this.loadSampleCOA(); // Load sample data initially
  }

  // Tab switch
  setTab(tab: 'accounts' | 'hierarchy' | 'balances') {
    this.currentTab = tab;
  }

  // Actions
  editAccount(accountId: number) {
    alert(`Edit account ${accountId}`);
  }

  toggleAccountStatus(accountId: number) {
    const acc = this.accounts.find(a => a.id === accountId);
    if (acc) acc.status = acc.status === 'Active' ? 'Inactive' : 'Active';
  }

  addAccount() {
    alert('Add Account clicked!');
  }

  exportCOA() {
    const dataStr = JSON.stringify(this.accounts, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart_of_accounts.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  loadSampleCOA() {
    this.accounts = [
      { id:1, code:'1000', name:'Cash', type:'Asset', subtype:'Current Asset', balance:125420, status:'Active' },
      { id:2, code:'1100', name:'Accounts Receivable', type:'Asset', subtype:'Current Asset', balance:42560, status:'Active' },
      { id:3, code:'1200', name:'Inventory', type:'Asset', subtype:'Current Asset', balance:85000, status:'Active' },
      { id:4, code:'1500', name:'Equipment', type:'Asset', subtype:'Fixed Asset', balance:250000, status:'Active' },
      { id:5, code:'2000', name:'Accounts Payable', type:'Liability', subtype:'Current Liability', balance:28750, status:'Active' },
      { id:6, code:'2500', name:'Loans Payable', type:'Liability', subtype:'Long-term Liability', balance:150000, status:'Active' },
      { id:7, code:'3000', name:'Common Stock', type:'Equity', subtype:'-', balance:200000, status:'Active' },
      { id:8, code:'3100', name:'Retained Earnings', type:'Equity', subtype:'-', balance:125230, status:'Active' },
      { id:9, code:'4000', name:'Sales Revenue', type:'Revenue', subtype:'Operating Revenue', balance:450000, status:'Active' },
      { id:10, code:'4100', name:'Service Revenue', type:'Revenue', subtype:'Operating Revenue', balance:85000, status:'Active' },
      { id:11, code:'5000', name:'Cost of Goods Sold', type:'Expense', subtype:'-', balance:225000, status:'Active' },
      { id:12, code:'6000', name:'Salaries Expense', type:'Expense', subtype:'-', balance:125000, status:'Active' },
      { id:13, code:'6100', name:'Rent Expense', type:'Expense', subtype:'-', balance:36000, status:'Active' },
      { id:14, code:'6200', name:'Utilities Expense', type:'Expense', subtype:'-', balance:8500, status:'Active' },
    ];
  }

  // Filters
  get filteredAccounts() {
    return this.accounts.filter(acc => {
      const matchSearch = acc.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchType = this.filterType === 'all' || acc.type === this.filterType;
      const matchStatus = this.filterStatus === 'all' || acc.status === this.filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }

  // Account hierarchy
  getAccountsByType(type: string) {
    return this.accounts.filter(a => a.type === type);
  }

  getAccountTypes() {
    return Array.from(new Set(this.accounts.map(a => a.type)));
  }

  // Account balances
  getTotalBalance(type: string) {
    return this.accounts
      .filter(a => a.type === type)
      .reduce((sum, a) => sum + a.balance, 0);
  }

  getTotalAllAccounts() {
    return this.accounts.reduce((sum, a) => sum + a.balance, 0);
  }
}
