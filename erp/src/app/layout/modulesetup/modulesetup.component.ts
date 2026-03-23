import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modulesetup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './modulesetup.component.html',
  styleUrl: './modulesetup.component.css',
})
export class ModulesetupComponent implements OnInit {

  currentTab: string = 'generalsetup';

  fiscalYearStart: string = '';
  baseCurrency: string = '';
  taxId: string = '';
  accountingMethod: string = '';

  private apiUrl = 'http://localhost:8080/api/setup';

  steps = [
    { label: 'Chart of Accounts', icon: 'fas fa-list-alt', status: 'completed' },
    { label: 'Financial Structure', icon: 'fas fa-cog', status: 'completed' },
    { label: 'Business Partners', icon: 'fas fa-users', status: 'active' },
    { label: 'Transaction Setup', icon: 'fas fa-exchange-alt', status: 'pending' },
    { label: 'Reporting', icon: 'fas fa-chart-bar', status: 'pending' },
    { label: 'Users & Permissions', icon: 'fas fa-user-shield', status: 'pending' }
  ];

  currentStepIndex = 2;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSetup();
  }

  //  GET data from backend
  loadSetup() {
    
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const setup = data[0]; // take first record
          this.setupId = setup.id;

          this.fiscalYearStart = setup.fiscalYearStart;
          this.baseCurrency = setup.baseCurrency;
          this.taxId = setup.taxId;
          this.accountingMethod = setup.accountingMethod;
        }
      },
      error: (err) => {
        console.error('Error loading setup:', err);
      }
    });
  }

  setupId: number | null = null;

  //  SAVE data to backend
  saveSetup() {
    const payload = {
      fiscalYearStart: this.fiscalYearStart,
      baseCurrency: this.baseCurrency,
      taxId: this.taxId,
      accountingMethod: this.accountingMethod
    };
  
    //  If ID exists → UPDATE
    if (this.setupId) {
      this.http.put(`${this.apiUrl}/${this.setupId}`, payload).subscribe({
        next: () => alert('Updated successfully'),
        error: (err) => console.error(err)
      });
  
    } else {
      // If no ID → CREATE
      this.http.post(this.apiUrl, payload).subscribe({
        next: () => alert('Saved successfully'),
        error: (err) => console.error(err)
      });
    }
  }

  testConnection() {
    alert('Connection test successful');
  }

  backupConfig() {
    alert('Backup completed');
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }

  goToStep(index: number) {
    this.currentStepIndex = index;

    this.steps.forEach((step, i) => {
      if (i < index) step.status = 'completed';
      else if (i === index) step.status = 'active';
      else step.status = 'pending';
    });
  }

  getProgressWidth(): number {
    return (this.currentStepIndex / (this.steps.length - 1)) * 100;
  }
}