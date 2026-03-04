import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-usermanagement',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.css',
})
export class UsermanagementComponent {
  currentTab: string = 'userslist';

  roles = ['Administrator', 'Accountant', 'Manager', 'Auditor'];

  users = [
    {
      id: 'USR001',
      fullName: 'Admin User',
      email: 'admin@company.com',
      role: 'Administrator',
      department: 'Finance',
      lastLogin: '2023-10-31 09:15',
      status: 'Active'
    },
    {
      id: 'USR002',
      fullName: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Accountant',
      department: 'Finance',
      lastLogin: '2023-10-30 14:30',
      status: 'Active'
    }
  ];

  setTab(tab: string) {
    this.currentTab = tab;
  }

  getActiveUsersCount(): number {
    return this.users.filter(u => u.status === 'Active').length;
  }

  getInactiveUsersCount(): number {
    return this.users.filter(u => u.status === 'Inactive').length;
  }

  addUser() {
    alert('Add User clicked');
  }

  manageRoles() {
    this.setTab('roles');
  }

  auditLogs() {
    this.setTab('audit');
  }

  editUser(user: any) {
    alert(`Edit ${user.fullName}`);
  }

  toggleUserStatus(user: any) {
    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
  }

}
