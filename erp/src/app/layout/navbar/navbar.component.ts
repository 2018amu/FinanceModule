import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  @Input() headerTitle: string = '';
  showNotifications = false;
  showUserDropdown = false;
  
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  
  showUserMenu() {
    this.showUserDropdown = !this.showUserDropdown;
  }
  
  selectedDomain: string = 'General Business';

  changeDomain(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
  
    const domainMap: any = {
      general: 'General Business',
      hotel: 'Hotel Industry',
      education: 'Education Sector',
      banking: 'Banking',
      manufacturing: 'Manufacturing'
    };
  
    this.selectedDomain = domainMap[value];
  }
  

 

}
