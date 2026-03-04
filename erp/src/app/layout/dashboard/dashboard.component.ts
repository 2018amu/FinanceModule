import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DashboardService, DashboardData } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: DashboardData | null = null;
  
  loading = false;
  errorMessage = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    this.dashboardService.getDashboardData().subscribe({
      next: (data: DashboardData) => {
        this.dashboard = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Dashboard error:', err);
        this.errorMessage = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }

  markAllComplete(): void {

    const dashboard = this.dashboard;
  
    if (!dashboard || !dashboard.pendingActions) return;
  
    const updatedActions = dashboard.pendingActions.map(a => ({
      ...a,
      status: 'Completed'
    }));
  
    this.dashboardService.updatePendingActions(updatedActions).subscribe({
      next: () => {
        dashboard.pendingActions = updatedActions;
      },
      error: err => {
        console.error('Error updating pending actions', err);
        alert('Failed to mark actions complete');
      }
    });
  }
}
