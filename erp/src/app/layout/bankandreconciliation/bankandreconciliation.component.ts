import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountService } from '../../services/bank-account.service';
import { FormsModule } from '@angular/forms';

interface BankAccount {
  id: number;
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
  imports: [CommonModule, FormsModule],
  templateUrl: './bankandreconciliation.component.html',
  styleUrls: ['./bankandreconciliation.component.css'],
})
export class BankandreconciliationComponent implements OnInit {
  currentTab: string = 'bankaccounts';

  totalBankBalance: number = 0;
  unreconciledCount: number = 0;
  lastReconciliation: string = '';
  bankAccountsCount: number = 0;

  bankAccounts: BankAccount[] = [];

  constructor(private bankService: BankAccountService) {}

  ngOnInit(): void {
    this.loadBankAccounts();
  }

  loadBankAccounts() {
    this.bankService.getBankAccounts().subscribe({
      next: (data: BankAccount[]) => {
        this.bankAccounts = data;

        // calculate total balance
        this.totalBankBalance = data.reduce((sum, acc) => sum + Number(acc.currentBalance), 0);

        this.bankAccountsCount = data.length;
      },
      error: (err) => {
        console.error('Error loading bank accounts', err);
      },
    });
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }

  trackByAccount(index: number, bank: BankAccount) {
    return bank.id;
  }

  openAddModal() {
    this.showBankModal = true;
  }
  // For adding a new bank account
openAddBankModal() {
  this.editingBank = {
    id: 0, // or undefined, backend will assign
    accountName: '',
    bankName: '',
    accountNumber: '',
    accountType: '',
    currentBalance: 0,
    lastUpdated: new Date().toISOString().split('T')[0], // today's date
    status: 'Active'
  };
  this.showBankModal = true;
}

// For editing an existing bank account
openEditBankModal(bank: BankAccount) {
  // Clone to avoid mutating table data before save
  this.editingBank = { ...bank };
  this.showBankModal = true;
}

  closeModal() {
    this.showBankModal = false;
    this.editingBank = {
      id: 0,
      accountName: '',
      bankName: '',
      accountNumber: '',
      accountType: '',
      currentBalance: 0,
      lastUpdated: new Date().toISOString(),
      status: '',
    };
  }
  saveBank() {
    if (!this.editingBank) return;
  
    // Clone object so we don't bind template directly to the table
    const bankToSave = { ...this.editingBank };
  
    this.bankService.addBankAccount(bankToSave).subscribe({
      next: (savedBank: BankAccount) => {
        if (bankToSave.id) {
          // Editing an existing bank account
          const index = this.bankAccounts.findIndex(b => b.id === savedBank.id);
          if (index !== -1) {
            this.bankAccounts[index] = savedBank; // replace old data
          }
          this.showToastMessage(`Bank account "${savedBank.accountName}" updated successfully!`, 'success');
        } else {
          // Adding a new bank account
          this.bankAccounts.push(savedBank); // push backend-saved object with proper ID
          this.showToastMessage(`Bank account "${savedBank.accountName}" added successfully!`, 'success');
        }
  
        this.closeModal();
        this.bankAccountsCount = this.bankAccounts.length;
      },
      error: (err) => {
        console.error('Error saving bank account:', err);
        this.showToastMessage('Failed to save bank account. Please try again.', 'error');
      }
    });
  }
  
 
  // Inside BankandreconciliationComponent
  toastMessage: string = '';
  showToast: boolean = false;
  toastType: 'success' | 'error' = 'success';

  showToastMessage(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    // Hide after 3 seconds
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  importBankStatement(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  handleFileUpload(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.bankService.importStatement(formData).subscribe({
      next: () => {
        alert('Bank statement imported successfully');
        this.loadBankAccounts();
      },
      error: (err) => {
        console.error(err);
        alert('Import failed');
      },
    });
  }

  reconcileAccount() {
    if (this.bankAccounts.length === 0) {
      alert('No bank accounts to reconcile');
      return;
    }

    this.bankService.reconcileBankAccounts().subscribe({
      next: (res) => {
        alert('Bank accounts reconciled successfully!');
        // Reload the accounts to reflect reconciled status
        this.loadBankAccounts();
      },
      error: (err) => {
        console.error('Reconciliation failed:', err);
        alert('Reconciliation failed. See console for details.');
      },
    });
  }
  showBankModal: boolean = false;
  editingBank: BankAccount = {
    id: 0,
    accountName: '',
    bankName: '',
    accountNumber: '',
    accountType: '',
    currentBalance: 0,
    lastUpdated: new Date().toISOString(),
    status: '',
  };
  editBank(bank: BankAccount) {
    this.editingBank = { ...bank }; // clone to avoid direct changes
    this.showBankModal = true;
  }

  deleteBank(bank: BankAccount) {
    const confirmDelete = confirm(`Delete ${bank.accountName}?`);
    if (!confirmDelete) return;
  
    // Call backend to delete
    this.bankService.deleteBankAccount(bank.id!).subscribe({
      next: (res) => {
        // Remove from local array only if backend succeeds
        this.bankAccounts = this.bankAccounts.filter(acc => acc.id !== bank.id);
        this.bankAccountsCount = this.bankAccounts.length;
        this.showToastMessage(`Bank account "${bank.accountName}" deleted successfully!`, 'success');
      },
      error: (err) => {
        console.error('Error deleting bank account:', err);
        this.showToastMessage('Failed to delete bank account. Please try again.', 'error');
      }
    });
  }
}
