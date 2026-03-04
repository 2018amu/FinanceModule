import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-modulesetup',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './modulesetup.component.html',
  styleUrl: './modulesetup.component.css',
})
export class ModulesetupComponent {
  currentTab: string = 'generalsetup';

  steps = [
    { label: 'Chart of Accounts', icon: 'fas fa-list-alt', status: 'completed' },
    { label: 'Financial Structure', icon: 'fas fa-cog', status: 'completed' },
    { label: 'Business Partners', icon: 'fas fa-users', status: 'active' },
    { label: 'Transaction Setup', icon: 'fas fa-exchange-alt', status: 'pending' },
    { label: 'Reporting', icon: 'fas fa-chart-bar', status: 'pending' },
    { label: 'Users & Permissions', icon: 'fas fa-user-shield', status: 'pending' }
  ];
  
  currentStepIndex = 2;
  
  goToStep(index: number) {
    this.currentStepIndex = index;
  
    this.steps.forEach((step, i) => {
      if (i < index) {
        step.status = 'completed';
      } else if (i === index) {
        step.status = 'active';
      } else {
        step.status = 'pending';
      }
    });
  }
  
  getProgressWidth(): number {
    return (this.currentStepIndex / (this.steps.length - 1)) * 100;
  }
  

  setTab(tab: string) {
    this.currentTab = tab;
  }

  saveSetup() {
    alert('Settings saved successfully');
  }
  testConnection() {
    alert('Connection test successful');
  }

  backupConfig() {
    alert('Backup completed');
  }

}
