import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domain-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './domaincomparison.component.html',
  styleUrls: ['./domaincomparison.component.css']
})
export class DomaincomparisonComponent {

  selectedDomain: string | null = null;

  selectDomain(domain: string) {
    this.selectedDomain = domain;
  }

}
