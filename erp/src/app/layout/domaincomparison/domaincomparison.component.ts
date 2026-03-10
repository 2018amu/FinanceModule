import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainService, Domain } from '../../services/domain.service';

@Component({
  selector: 'app-domain-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './domaincomparison.component.html',
})
export class DomaincomparisonComponent implements OnInit {

  domains: Domain[] = [];
  selectedDomain?: Domain;

  constructor(private domainService: DomainService) {}

  ngOnInit(): void {
    this.loadDomains();
  }

  loadDomains(): void {
    this.domainService.getDomains().subscribe({
      next: data => this.domains = data,
      error: err => console.error('Error loading domains', err)
    });
  }

  showDomainDetails(name: string): void {
    this.domainService.getDomainByName(name).subscribe({
      next: domain => this.selectedDomain = domain,
      error: err => console.error('Error loading domain', err)
    });
  }

  applyDomainSettings(name: string): void {
    this.domainService.applyDomainSettings(name).subscribe({
      next: domain => {
        alert(`${domain.title} settings applied`);
        this.loadDomains();
      },
      error: err => console.error('Error applying domain settings', err)
    });
  }
}