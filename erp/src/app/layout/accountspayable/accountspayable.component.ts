import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accountspayable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accountspayable.component.html'
})
export class AccountspayableComponent {

  activeTab = 'invoices';

  // Full invoices
  invoices = [
    { vendor: 'Office Supplies Ltd', invoiceNo: 'INV-001', date: '2023-10-01', dueDate: '2023-10-31', amount: 1250.50, status: 'overdue' },
    { vendor: 'Tech Solutions Inc', invoiceNo: 'INV-002', date: '2023-10-05', dueDate: '2023-11-04', amount: 3500.00, status: 'overdue' },
    { vendor: 'Utilities Corp', invoiceNo: 'INV-003', date: '2023-09-25', dueDate: '2023-10-25', amount: 850.75, status: 'overdue' }
  ];

  // This array is bound to the table
  filteredInvoices = [...this.invoices];

  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedVendor: string = 'all';

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // Badge colors
  getStatusClass(status: string) {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'paid': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  // FILTER FUNCTION
  filterInvoices() {
    this.filteredInvoices = this.invoices.filter(invoice => {

      const matchesSearch = this.searchTerm
        ? invoice.vendor.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          invoice.invoiceNo.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesStatus = this.selectedStatus === 'all' ? true : invoice.status === this.selectedStatus;
      const matchesVendor = this.selectedVendor === 'all' ? true : invoice.vendor === this.selectedVendor;

      return matchesSearch && matchesStatus && matchesVendor;
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterInvoices();
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.target.value;
    this.filterInvoices();
  }

  onVendorChange(event: any) {
    this.selectedVendor = event.target.value;
    this.filterInvoices();
  }

}
