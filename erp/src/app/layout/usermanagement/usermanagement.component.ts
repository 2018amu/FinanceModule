import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './usermanagement.component.html',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  newUser: any = {
    userId: '',
    fullName: '',
    email: '',
    role: '',
    department: '',
    status: 'Active'
  };

  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;
  roleCount = 0;
  activeTab = 'userslist';

  toggleUserStatus(id: number) {
    const user = this.users.find((u) => u.id === id);

    if (user) {
      if (user.status === 'Active') {
        user.status = 'Inactive';
      } else {
        user.status = 'Active';
      }
    }
  }
  saveUser(form: any) {
    if (form.invalid) {
      return; // do not save if form is invalid
    }
  
    this.userService.addUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.closeAddUserModal();
      this.newUser = {
        userId: '',
        fullName: '',
        email: '',
        role: '',
        department: '',
        status: 'Active'
      };
    });
  }
  editingUser: any = null;
showEditUserModal = false;

editUser(id: number) {
  const user = this.users.find(u => u.id === id);
  if (user) {
    this.editingUser = { ...user }; // clone object
    this.showEditUserModal = true;
  }
}

closeEditUserModal() {
  this.showEditUserModal = false;
}
saveEditedUser(form: any) {
  if (!form.valid || !this.editingUser || !this.editingUser.id) {
    return; // do not proceed if form invalid or editingUser not set
  }

  this.userService.updateUser(this.editingUser.id, this.editingUser).subscribe({
    next: (res) => {
      this.auditLogsList.unshift({
        user: this.editingUser.fullName,
        action: "Updated User",
        role: this.editingUser.role,
        time: new Date().toLocaleString()
      });

      console.log('User updated successfully', res);
      this.loadUsers(); // reload table
      this.closeEditUserModal();
      this.editingUser = null;
    },
    error: (err) => {
      console.error('Update user error:', err);

      // Optional: show a user-friendly message
      alert(
        err?.error?.message ||
        'Something went wrong while updating the user. Check server logs.'
      );
    }
  });
}
  

roles: string[] = [];
newRole: string = '';
showRoleModal = false;
manageRoles() {
  // collect unique roles from users
  this.roles = [...new Set(this.users.map(u => u.role))];
  this.showRoleModal = true;
}
addRole() {
  if (!this.newRole.trim()) return;

  if (!this.roles.includes(this.newRole)) {
    this.roles.push(this.newRole);
  }

  this.newRole = '';
}
deleteRole(role: string) {
  this.roles = this.roles.filter(r => r !== role);
}
closeRoleModal() {
  this.showRoleModal = false;
}

auditLogsList: any[] = [];
showAuditModal = false;

auditLogs() {

  this.auditLogsList = this.users.map(u => ({
    user: u.fullName,
    action: "Viewed User Record",
    role: u.role,
    time: new Date().toLocaleString()
  }));

  this.showAuditModal = true;
}
closeAuditModal() {
  this.showAuditModal = false;
}

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  
  
  showAddUserModal = false;
  
  addUser() {
    this.showAddUserModal = true;
  }
  
  closeAddUserModal() {
    this.showAddUserModal = false;
  }
  
  // saveUser() {
  
  //   this.userService.addUser(this.newUser).subscribe(() => {
  
  //     this.loadUsers(); // reload table
  
  //     this.closeAddUserModal();
  
  //     this.newUser = {
  //       userId: '',
  //       fullName: '',
  //       email: '',
  //       role: '',
  //       department: '',
  //       status: 'Active'
  //     };
  
  //   });
  
  // }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;

      this.totalUsers = this.users.length;

      this.activeUsers = this.users.filter((u) => u.status === 'Active').length;

      this.inactiveUsers = this.users.filter((u) => u.status !== 'Active').length;
      const roles = new Set(this.users.map(u => u.role));
      this.roleCount = roles.size;
    });
  }
}
