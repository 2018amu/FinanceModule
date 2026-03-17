import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApService, Invoice } from '../../services/ap.service';

@Component({
  selector: 'app-accountspayable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accountspayable.component.html'
})
export class AccountspayableComponent implements OnInit {

  activeTab = 'invoices';

  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];

  searchTerm = '';
  selectedStatus = 'all';
  selectedVendor = 'all';

  isAddVendorOpen = false;

  totalDue = 0;
  overdueAmount = 0;
  dueThisWeek = 0;
  vendorCount = 0;

  newInvoice: Invoice = {
    id: 0,
    vendorName: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    amount: 0,
    status: 'PENDING'
  };

  constructor(private apService: ApService) {}

  ngOnInit() {
    this.loadInvoices();
    this.refreshVendorCount();
  }

  /* LOAD DATA FROM BACKEND */
  loadInvoices() {
    this.apService.getInvoices().subscribe({
      next: (data: Invoice[]) => {

        this.invoices = data;
        this.filteredInvoices = [...data];

        this.calculateSummary();

      },
      error: (err: any) => {
        console.error("Error loading invoices", err);
      }
    });
  }

  /* SUMMARY CARDS */
  calculateSummary() {

    this.totalDue = this.invoices
      .filter(i => i.status !== 'PAID')
      .reduce((sum, i) => sum + i.amount, 0);
  
    this.overdueAmount = this.invoices
      .filter(i => i.status === 'OVERDUE')
      .reduce((sum, i) => sum + i.amount, 0);
  
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
  
    this.dueThisWeek = this.invoices
      .filter(i => new Date(i.dueDate) <= nextWeek)
      .reduce((sum, i) => sum + i.amount, 0);
  
    /* FIXED VENDOR COUNT */
  
    const uniqueVendors = new Set(
      this.invoices.map(inv => inv.vendorName)
    );
  
    this.vendorCount = uniqueVendors.size;
  
  }

  refreshVendorCount() {
    this.apService.getVendorCount().subscribe({
      next: (count: number) => {
        this.vendorCount = count;
      },
      error: (err) => console.error("Error getting vendor count", err)
    });
  }

  /* TAB SWITCH */
  setTab(tab: string) {
    this.activeTab = tab;
  }

  /* STATUS BADGE */
  getStatusClass(status: string) {

    switch (status) {
      case 'OVERDUE':
        return 'bg-red-100 text-red-600';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-600';
      case 'PAID':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  /* FILTERING */
  filterInvoices() {

    this.filteredInvoices = this.invoices.filter(invoice => {

      const matchesSearch = this.searchTerm
        ? invoice.vendorName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          invoice.invoiceNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesStatus =
        this.selectedStatus === 'all'
        ? true
        : invoice.status.toLowerCase() === this.selectedStatus;

      const matchesVendor =
        this.selectedVendor === 'all'
        ? true
        : invoice.vendorName === this.selectedVendor;

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

  /* MODAL */
  openAddInvoice() {
    this.isAddVendorOpen = true;
  }

  closeAddInvoice() {
    this.isAddVendorOpen = false;
  }

  /* SAVE INVOICE */
  saveInvoice() {
    this.apService.addInvoice(this.newInvoice).subscribe({
      next: (data: Invoice) => {
        this.invoices.push(data);
        this.filteredInvoices = [...this.invoices];
  
        this.calculateSummary();
        this.refreshVendorCount(); 
  
        this.newInvoice = {
          id: 0,
          vendorName: '',
          invoiceNumber: '',
          invoiceDate: '',
          dueDate: '',
          amount: 0,
          status: 'PENDING'
        };
  
        this.isAddVendorOpen = false;
      },
      error: (err: any) => console.error("Error saving invoice", err)
    });
  }
  
  onPayInvoice(id: number | undefined) {
    if (!id) return; // prevent error
  
    this.apService.payInvoice(id).subscribe({
      next: (data: Invoice) => {
        console.log('Paid:', data);
  
        // Update UI
        const inv = this.invoices.find(i => i.id === id);
        if (inv) {
          inv.status = 'PAID';
        }
  
        this.filterInvoices();
      },
      error: (err: any) => {
        console.error('Error paying invoice', err);
      }
    });
  }

  selectedInvoice: any = null;
isViewInvoiceOpen = false;

onViewInvoice(invoice: any) {
  this.selectedInvoice = invoice;
  this.isViewInvoiceOpen = true;
}
processPayments() {
  // Get only unpaid invoices
  const unpaidInvoices = this.invoices.filter(
    inv => inv.status !== 'PAID'
  );

  if (unpaidInvoices.length === 0) {
    alert("No pending payments");
    return;
  }

  unpaidInvoices.forEach(inv => {
    if (inv.id) {
      this.apService.payInvoice(inv.id).subscribe({
        next: () => {
          inv.status = 'PAID'; // update UI
        },
        error: (err) => {
          console.error(`Error paying invoice ${inv.id}`, err);
        }
      });
    }
  });

  

  // Refresh table after short delay (optional)
  setTimeout(() => {
    this.loadInvoices(); // reload from backend
  }, 500);
}

closeViewInvoice() {
  this.isViewInvoiceOpen = false;
  this.selectedInvoice = null;
}
processPaymentsOnce() {
  this.apService.payAllInvoices().subscribe({
    next: (data) => {
      console.log("All invoices paid", data);
      this.loadInvoices(); // refresh UI
    },
    error: (err) => {
      console.error("Error processing payments", err);
    }
  });
}
exportInvoices() {
  if (!this.filteredInvoices || this.filteredInvoices.length === 0) {
    alert("No data to export");
    return;
  }

  // CSV headers
  const headers = [
    'Vendor',
    'Invoice Number',
    'Invoice Date',
    'Due Date',
    'Amount',
    'Status'
  ];

  // Convert data to CSV rows
  const rows = this.filteredInvoices.map(inv => [
    inv.vendorName,
    inv.invoiceNumber,
    inv.invoiceDate,
    inv.dueDate,
    inv.amount,
    inv.status
  ]);

  // Combine headers + rows
  const csvContent =
    [headers, ...rows]
      .map(e => e.join(","))
      .join("\n");

  // Create file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);

  // Download
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "invoices.csv");
  link.click();
}

}