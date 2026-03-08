import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { GlService } from '../../services/general-ledger.service';

export type TabName = 'journals' | 'trialbalance' | 'ledger' | 'closing';

@Component({
  selector: 'app-general-ledger',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css']
})
export class GeneralLedgerComponent implements OnInit {

  constructor(private glService: GlService) {}

  ngOnInit(): void {
    this.loadJournals();
    this.loadTrialBalance();
    this.loadLedger();
  }

  newJournal = {
    no: '',
    date: '',
    description: '',
    debit: 0,
    credit: 0,
    status: 'Draft'
  };
  
  showJournalForm = false;
  
  toggleJournalForm() {
    this.showJournalForm = !this.showJournalForm;
  }
  
  submitJournal() {
    this.glService.addJournal(this.newJournal).subscribe(res => {
      this.journals.push(res);
      this.filteredJournals.push(res);
      this.newJournal = { no: '', date: '', description: '', debit: 0, credit: 0, status: 'Draft' };
      this.showJournalForm = false;
    });
  }
  addJournal() {
    if (!this.newJournal.no || !this.newJournal.date) {
      alert('Journal No and Date are required');
      return;
    }

    this.glService.addJournal(this.newJournal).subscribe(
      res => {
        // Update table
        this.journals.push(res);
        this.filteredJournals.push(res);

        // Reset form
        this.newJournal = { no: '', date: '', description: '', debit: 0, credit: 0, status: 'Draft' };
        this.showJournalForm = false;
      },
      err => {
        console.error('Failed to add journal', err);
        alert('Error adding journal. Check console for details.');
      }
    );
  }

  filterJournals() {

    const statusFilter =
      (document.getElementById('journalStatusFilter') as HTMLSelectElement)?.value;
  
    const dateFilter =
      (document.getElementById('journalDateFilter') as HTMLInputElement)?.value;
  
    this.filteredJournals = this.journals.filter(j => {
  
      const statusMatch =
        statusFilter === 'all' || j.status === statusFilter;
  
      const dateMatch =
        !dateFilter || j.date === dateFilter;
  
      return statusMatch && dateMatch;
    });
  
  }

  /* ---------------------------
     WORKFLOW STEPS
  --------------------------- */

  currentStep = 1;

  steps = [
    { label: 'Create Entry', icon: 'fas fa-plus' },
    { label: 'Review', icon: 'fas fa-eye' },
    { label: 'Approve', icon: 'fas fa-check' },
    { label: 'Post to GL', icon: 'fas fa-book' }
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
    this.currentStep = step;
  }


  /* ---------------------------
     TABS
  --------------------------- */

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


  /* ---------------------------
     JOURNALS
  --------------------------- */

  journals: any[] = [];
  filteredJournals: any[] = [];

  journalSearchText = '';
  journalStatusFilter = 'all';
  journalDateFilter = '';

  loadJournals() {
    this.glService.getJournals().subscribe((data: any[]) => {
      this.journals = data;
      this.filteredJournals = [...this.journals];
    });
  }

  searchJournals(event: Event) {
    this.journalSearchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyJournalFilters();
  }

  updateStatusFilter(status: string) {
    this.journalStatusFilter = status;
    this.applyJournalFilters();
  }

  updateDateFilter(date: string) {
    this.journalDateFilter = date;
    this.applyJournalFilters();
  }

  applyJournalFilters() {
    this.filteredJournals = this.journals.filter(j => {

      const searchMatch =
        j.no.toLowerCase().includes(this.journalSearchText) ||
        j.description.toLowerCase().includes(this.journalSearchText);

      const statusMatch =
        this.journalStatusFilter === 'all' ||
        j.status === this.journalStatusFilter;

      const dateMatch =
        !this.journalDateFilter ||
        j.date === this.journalDateFilter;

      return searchMatch && statusMatch && dateMatch;
    });
  }


  /* ---------------------------
     TRIAL BALANCE
  --------------------------- */

  trialBalance: any[] = [];

  loadTrialBalance() {
    this.glService.getTrialBalance().subscribe((data: any[]) => {
      this.trialBalance = data;
    });
  }


  /* ---------------------------
     LEDGER DETAILS
  --------------------------- */

  ledgerEntries: any[] = [];

  loadLedger() {
    this.glService.getLedgerEntries().subscribe((data: any[]) => {
      this.ledgerEntries = data;
    });
  }


  /* ---------------------------
     PERIOD CLOSING
  --------------------------- */

  closingInfo = {
    period: '',
    status: 'Open'
  };
  showJournalEntryModal() {
    // implement modal logic here or use Angular Material / ngx-bootstrap modal
    console.log('Show Journal Entry Modal');
  }
  
  postAllEntries() {
    // call backend API to post all journals
    console.log('Posting all entries...');
  }
  
  runMonthEndClose() {
    // call backend API to close period
    console.log('Running month-end close...');
  }

  runClosingProcess() {
    this.glService.runClosing(this.closingInfo).subscribe(() => {
      alert('Closing process completed');
    });
  }

  

}