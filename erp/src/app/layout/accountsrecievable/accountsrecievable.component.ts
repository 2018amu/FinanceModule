import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accountsrecievable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accountsrecievable.component.html',
  styleUrl: './accountsrecievable.component.css',
})
export class AccountsrecievableComponent {
  currentTab: string = 'arinvoices';

  setTab(tab: string) {
    this.currentTab = tab;
  }
}
