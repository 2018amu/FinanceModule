import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlService } from '../../services/general-ledger.service';

export type TabName = 'journals' | 'trialbalance' | 'ledger' | 'closing';

@Component({
  selector: 'app-general-ledger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css'],
})
export class GeneralLedgerComponent implements OnInit {
  constructor(private glService: GlService) {}

  ngOnInit(): void {
    this.loadJournals();
    this.loadTrialBalance();
    this.loadLedger();
  }

  /* ---------------------------
     NEW JOURNAL FORM
  --------------------------- */

  newJournal = {
    journalNo: '',
    date: '',
    description: '',
    debit: 0,
    credit: 0,
    status: 'Draft',
  };

  showJournalForm = false;

  toggleJournalForm() {
    this.showJournalForm = !this.showJournalForm;
  }

  viewJournalEntry(id: number) {
    const journal = this.journals.find((j) => j.id === id);
    if (journal) {
      // Example: Show in console or open modal
      console.log('Viewing Journal:', journal);
      this.showJournalForm = true;
      this.newJournal = { ...journal };
      this.currentStep = 2; // fill form with selected journal data if needed
    }
  }

  
  approveJournalEntry(id: number) {
    this.glService.approveJournal(id).subscribe({
      next: (res: any) => {
        const index = this.journals.findIndex(j => j.id === id);
        if (index !== -1) this.journals[index].status = 'Approved';
        this.filteredJournals = [...this.journals];
        this.currentStep = 3; // Move step to Approve
      },
      error: (err) => {
        console.error('Failed to approve journal:', err);
        alert('Failed to approve journal. Check console.');
      }
    });
  }
  
  postJournalEntry(id: number) {
    this.glService.postJournal(id).subscribe({
      next: (res: any) => {
        const index = this.journals.findIndex(j => j.id === id);
        if (index !== -1) this.journals[index].status = 'Posted';
        this.filteredJournals = [...this.journals];
        this.currentStep = 4; // Move step to Post
      },
      error: (err) => {
        console.error('Failed to post journal:', err);
        alert('Failed to post journal. Check console.');
      }
    });
  }

  isSaving = false;
  startJournal() {
    this.showJournalForm = true;
    this.currentStep = 1;
  }

  submitJournal() {
    if (this.isSaving) return; // prevent double click

    this.isSaving = true;

    this.glService.addJournal(this.newJournal).subscribe({
      next: (res: any) => {
        this.journals.push(res);
        this.filteredJournals = [...this.journals];

        this.newJournal = {
          journalNo: '',
          date: '',
          description: '',
          debit: 0,
          credit: 0,
          status: 'Draft',
        };

        this.showJournalForm = false;
        this.isSaving = false;
        // move to review step
        this.currentStep = 2;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to save journal');
        this.isSaving = false;
      },
    });
  }

  /* ---------------------------
     JOURNALS TABLE
  --------------------------- */

  journals: any[] = [];
  filteredJournals: any[] = [];

  journalSearchText = '';
  journalStatusFilter = 'all';
  journalDateFilter = '';

  loadJournals() {
    this.glService.getJournals().subscribe({
      next: (data: any[]) => {
        console.log('Journal API Data:', data);

        this.journals = data;
        this.filteredJournals = [...data];
      },

      error: (err) => {
        console.error('Journal API Error:', err);
      },
    });
  }

  searchJournals(event: Event) {
    this.journalSearchText = (event.target as HTMLInputElement).value.toLowerCase();

    this.applyJournalFilters();
  }

  filterJournals() {
    this.journalStatusFilter = (
      document.getElementById('journalStatusFilter') as HTMLSelectElement
    )?.value;

    this.journalDateFilter = (
      document.getElementById('journalDateFilter') as HTMLInputElement
    )?.value;

    this.applyJournalFilters();
  }

  applyJournalFilters() {
    this.filteredJournals = this.journals.filter((j) => {
      const searchMatch =
        j.no?.toLowerCase().includes(this.journalSearchText) ||
        j.description?.toLowerCase().includes(this.journalSearchText);

      const statusMatch =
        this.journalStatusFilter === 'all' || j.status === this.journalStatusFilter;

      const dateMatch = !this.journalDateFilter || j.date === this.journalDateFilter;

      return searchMatch && statusMatch && dateMatch;
    });
  }

  // Count of Draft journals

  get totalJournalsCount(): number {
    return this.journals.length;
  }

  get draftJournalsCount(): number {
    return this.journals.filter((j) => j.status === 'Draft').length;
  }

  get thisMonthJournalsCount(): number {
    const now = new Date();
    return this.journals.filter((j) => {
      const date = new Date(j.date);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;
  }

  get debitCreditBalance(): { debit: number; credit: number } {
    const debit = this.journals.reduce((sum, j) => sum + j.debit, 0);
    const credit = this.journals.reduce((sum, j) => sum + j.credit, 0);
    return { debit, credit };
  }
  // Calculate total debit
  totalDebit(): number {
    return this.journals.reduce((sum, j) => sum + (j.debit || 0), 0);
  }

  // Calculate total credit
  totalCredit(): number {
    return this.journals.reduce((sum, j) => sum + (j.credit || 0), 0);
  }

  currentStep = 1;

  steps = [
    { label: 'Create Entry', icon: 'fas fa-plus' },
    { label: 'Review', icon: 'fas fa-eye' },
    { label: 'Approve', icon: 'fas fa-check' },
    { label: 'Post to GL', icon: 'fas fa-book' },
  ];

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
    if (step >= 1 && step <= this.steps.length) {
      this.currentStep = step;
    }
  }

  /* ---------------------------
     TABS
  --------------------------- */

  activeTab: TabName = 'journals';

  tabs: { name: TabName; label: string }[] = [
    { name: 'journals', label: 'Journal Entries' },
    { name: 'trialbalance', label: 'Trial Balance' },
    { name: 'ledger', label: 'Ledger Details' },
    { name: 'closing', label: 'Period Closing' },
  ];

  setTab(tab: TabName) {
    this.activeTab = tab;
  }

  getTabClass(tab: TabName): string {
    return this.activeTab === tab
      ? 'border-b-2 border-indigo-600 font-semibold text-indigo-600'
      : 'text-gray-600 hover:text-indigo-500';
  }

  /* ---------------------------
     TRIAL BALANCE
  --------------------------- */

  trialBalance: any[] = [];

  loadTrialBalance() {
    this.glService.getTrialBalance().subscribe({
      next: (data: any[]) => {
        this.trialBalance = data;
      },

      error: (err) => {
        console.error('Trial balance error:', err);
      },
    });
  }

  /* ---------------------------
     LEDGER
  --------------------------- */

  ledgerEntries: any[] = [];

  loadLedger() {
    this.glService.getLedgerEntries().subscribe({
      next: (data: any[]) => {
        this.ledgerEntries = data;
      },

      error: (err) => {
        console.error('Ledger error:', err);
      },
    });
  }

  /* ---------------------------
     PERIOD CLOSING
  --------------------------- */

  closingInfo = {
    period: '',
    status: 'Open',
  };

  postAllEntries() {
    console.log('Posting all entries...');
  }

  runMonthEndClose() {
    console.log('Running month-end close...');
  }
}
