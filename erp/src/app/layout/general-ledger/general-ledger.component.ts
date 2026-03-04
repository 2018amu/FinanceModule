import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Allowed tab names
export type TabName = 'journals' | 'trialbalance' | 'ledger' | 'closing';

@Component({
  selector: 'app-general-ledger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css']
})
export class GeneralLedgerComponent {
  currentStep = 1; // start from step 1

  // Define steps
  steps = [
    { label: 'Create Entry', icon: 'fas fa-plus' },
    { label: 'Review', icon: 'fas fa-eye' },
    { label: 'Approve', icon: 'fas fa-check' },
    { label: 'Post to GL', icon: 'fas fa-book' }
  ];

  // Step navigation
  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
  }
  

  // Tabs
  activeTab: TabName = 'journals';
  tabs: { name: TabName; label: string }[] = [
    { name: 'journals', label: 'Journal Entries' },
    { name: 'trialbalance', label: 'Trial Balance' },
    { name: 'ledger', label: 'Ledger Details' },
    { name: 'closing', label: 'Period Closing' }
  ];

  setTab(tab: TabName) {
    this.activeTab = tab;
  }

  getTabClass(tab: TabName): string {
    return this.activeTab === tab
      ? 'border-b-2 border-indigo-600 font-semibold text-indigo-600'
      : 'text-gray-600 hover:text-indigo-500';
  }

  // Journal Entries
  journals = [
    { date: '2026-10-05', no: 'JRNL-001', description: 'Initial capital investment', debit: 5000, credit: 5000, status: 'Posted' },
    { date: '2026-10-06', no: 'JRNL-002', description: 'Purchase of computer equipment', debit: 2500, credit: 2500, status: 'Posted' },
    { date: '2026-10-07', no: 'JRNL-003', description: 'Office supplies', debit: 300, credit: 300, status: 'Draft' }
  ];
  filteredJournals = [...this.journals];

  searchJournals(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredJournals = this.journals.filter(j =>
      j.no.toLowerCase().includes(input) || j.description.toLowerCase().includes(input)
    );
  }

  filterJournals() {
    const statusFilter = (document.getElementById('journalStatusFilter') as HTMLSelectElement).value;
    const dateFilter = (document.getElementById('journalDateFilter') as HTMLInputElement).value;

    this.filteredJournals = this.journals.filter(j => {
      const statusMatch = statusFilter === 'all' || j.status === statusFilter;
      const dateMatch = !dateFilter || j.date === dateFilter;
      return statusMatch && dateMatch;
    });
  }

  // Trial Balance (sample)
  trialBalance = [
    { account: 'Cash', debit: 10000, credit: 0 },
    { account: 'Capital', debit: 0, credit: 5000 },
    { account: 'Equipment', debit: 2500, credit: 0 },
    { account: 'Supplies', debit: 300, credit: 0 }
  ];

  // Ledger Details (sample)
  ledgerEntries = [
    { account: 'Cash', date: '2026-10-05', description: 'Initial capital', debit: 5000, credit: 0 },
    { account: 'Cash', date: '2026-10-06', description: 'Purchase computer', debit: 0, credit: 2500 }
  ];

  // Period Closing (sample)
  closingInfo = {
    period: 'October 2026',
    status: 'Open'
  };
}
