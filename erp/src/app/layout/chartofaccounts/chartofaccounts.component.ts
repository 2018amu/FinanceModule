import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartofaccountsService, Account } from '../../services/chartofaccounts.service';

@Component({
  selector: 'app-chart-of-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chartofaccounts.component.html',
  styleUrls: ['./chartofaccounts.component.css'],
})
export class ChartOfAccountsComponent implements OnInit {
  accounts: Account[] = [];
  showAddModal: boolean = false;
  editMode: boolean = false;

  currentTab: 'accounts' | 'hierarchy' | 'balances' = 'accounts';
  searchText: string = '';
  filterType: string = 'all';
  filterStatus: string = 'all';

  types: string[] = ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];

  newAccount: Account = this.getEmptyAccount();

  constructor(private coaService: ChartofaccountsService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  private getEmptyAccount(): Account {
    return {
      account_code: '',
      account_name: '',
      type: 'Expense',
      sub_type: '',
      balance: 0,
      status: 'Active',
    };
  }

  // Export COA as JSON file
  exportCOA() {
    if (!this.accounts || this.accounts.length === 0) {
      alert('No accounts available to export.');
      return;
    }

    const dataStr = JSON.stringify(this.accounts, null, 2); // pretty JSON
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart_of_accounts.json';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  loadAccounts() {
    this.coaService.getAccounts().subscribe({
      next: (data) => (this.accounts = data),
      error: (err) => console.error('Error loading accounts:', err),
    });
  }

  // Show modal for adding new account
  addAccount() {
    this.editMode = false;
    this.resetNewAccountForm();
    this.showAddModal = true;
  }

  // Close modal
  closeModal() {
    this.showAddModal = false;
  }

  // Save new account to backend
  saveNewAccount() {
    // Validate required fields
    if (!this.newAccount.account_code || !this.newAccount.account_name) {
      alert('Account Code and Account Name are required.');
      return;
    }
  
    if (this.editMode && this.newAccount.id) {
      // ---- UPDATE FLOW ----
      this.coaService.updateAccount(this.newAccount).subscribe({
        next: (updated) => {
          // Update the account in the table
          const index = this.accounts.findIndex(a => a.id === updated.id);
          if (index !== -1) this.accounts[index] = updated;
  
          // Close modal AFTER successful update
          this.showAddModal = false;
  
          // Reset form AFTER closing modal
          this.resetNewAccountForm();
  
          alert('Account updated successfully!');
        },
        error: (err) => {
          console.error('Update error full object:', err);
          alert('Error updating account. Check console.');
        }
      });
    } else {
      // ---- ADD NEW ACCOUNT FLOW ----
      this.coaService.addAccount(this.newAccount).subscribe({
        next: (saved) => {
          // Add new account to the table
          this.accounts.push(saved);
  
          // Close modal AFTER successful save
          this.showAddModal = false;
  
          // Reset form AFTER closing modal
          this.resetNewAccountForm();
  
          alert('Account saved successfully!');
        },
        error: (err) => {
          console.error('Save error full object:', err);
          alert('Error saving account. Check console.');
        }
      });
    }
  }
  
  // Reset the form to empty account
  resetNewAccountForm() {
    this.newAccount = {
      account_code: '',
      account_name: '',
      type: 'Expense',
      sub_type: '',
      balance: 0,
      status: 'Active',
    };
  }

  editAccount(accountId?: number) {
    if (!accountId) return;

    const acc = this.accounts.find((a) => a.id === accountId);
    if (acc) {
      this.newAccount = { ...acc }; // copy data
      this.editMode = true; // enable update mode
      this.showAddModal = true; // show modal
    }
  }

  deleteAccount(accountId?: number) {
    if (!accountId) return;
    if (!confirm(`Are you sure you want to delete this account: "${accountId}"?`)) return;

    // Delete
    this.coaService.deleteAccount(accountId).subscribe({
      next: () => {
        console.log('Delete success:', accountId);
        this.accounts = this.accounts.filter((a) => a.id !== accountId);
      },
      error: (err) => {
        console.error('Delete error full object:', err); // full error object
        console.log('HTTP Status:', err.status);
        console.log('Server error:', err.error);
        console.log('Error message:', err.message);
        alert('Error deleting account. Check console for details.');
      },
    });
  }

  toggleAccountStatus(accountId?: number) {
    if (!accountId) return;
    const acc = this.accounts.find((a) => a.id === accountId);
    if (!acc) return;

    acc.status = acc.status === 'Active' ? 'Inactive' : 'Active';
    this.coaService.updateAccount(acc).subscribe({
      next: (updated) => {
        const idx = this.accounts.findIndex((a) => a.id === updated.id);
        if (idx !== -1) this.accounts[idx] = updated;
      },
      error: (err) => console.error('Error toggling status:', err),
    });
  }

  get filteredAccounts() {
    return this.accounts.filter((acc) => {
      const matchSearch = acc.account_name?.toLowerCase().includes(this.searchText.toLowerCase());
      const matchType = this.filterType === 'all' || acc.type === this.filterType;
      const matchStatus = this.filterStatus === 'all' || acc.status === this.filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }

  setTab(tab: 'accounts' | 'hierarchy' | 'balances') {
    this.currentTab = tab;
  }

  getAccountTypes() {
    return Array.from(new Set(this.accounts.map((a) => a.type)));
  }
}
