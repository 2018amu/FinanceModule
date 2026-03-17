import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ARService, ARInvoice } from '../../services/ar.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accountsrecievable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accountsrecievable.component.html',
  styleUrls: ['./accountsrecievable.component.css'],
})
export class AccountsrecievableComponent implements OnInit {
  currentTab: string = 'arinvoices';

  invoices: ARInvoice[] = [];
  filteredInvoices: ARInvoice[] = [];

  searchTerm: string = '';
  selectedStatus: string = 'all';

  customerCount: number = 0;

  isAddInvoiceOpen: boolean = false;
  newInvoice: ARInvoice = {
    id: 0,
    customerName: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    amount: 0,
    balance: 0,
    status: 'PENDING',
  };


selectedInvoice: ARInvoice | null = null;
isViewInvoiceOpen: boolean = false;

// Method for "View" button
onViewInvoice(invoice: ARInvoice) {
  this.selectedInvoice = invoice;   // store the clicked invoice
  this.isViewInvoiceOpen = true;    // open modal
}

// Method to close the modal
closeViewInvoice() {
  this.isViewInvoiceOpen = false;
  this.selectedInvoice = null;
}
  
// Function to save invoice via backend
  saveInvoice() {
    if (!this.newInvoice.customerName || !this.newInvoice.invoiceNumber || !this.newInvoice.amount) {
      alert('Please fill all required fields');
      return;
    }
  
    // Set initial balance to be equal to the invoice amount
    this.newInvoice.balance = this.newInvoice.amount;
  
    // Set initial status to "PENDING"
    this.newInvoice.status = 'PENDING';
  
    this.arService.addInvoice(this.newInvoice).subscribe({
      next: (data:ARInvoice) => {
        this.invoices.push(data);
        this.filteredInvoices.push(data);
        alert('Invoice has been successfully recorded.');
        this.loadCustomerCount();  // refresh customer count
        this.closeAddInvoice();
      },
      error: (err:any) => console.error('Error saving invoice', err)
    });
  }

  constructor(private arService: ARService) {}

  ngOnInit() {
    this.loadInvoices();
    this.loadCustomerCount();
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }

  loadInvoices(): void {
    this.arService.getInvoices().subscribe({
      next: (data: ARInvoice[]) => {
        // explicitly typed
        this.invoices = data;
        this.filteredInvoices = [...this.invoices];
        this.calculateTotals();
      },
      error: (err: any) => {
        // explicitly typed
        console.error('Error loading invoices', err);
      },
    });
  }

  loadCustomerCount(): void {
    this.arService.getCustomerCount().subscribe({
      next: (count: number) => {
        // explicitly type count
        this.customerCount = count;
      },
      error: (err: any) => {
        // explicitly type err
        console.error('Error loading customer count', err);
      },
    });
  }
  
 payAllInvoices() {
    this.arService.payAllInvoices().subscribe({
      next: () => {
        // Update frontend table after paying all invoices
        this.invoices.forEach(inv => {
          inv.balance = 0;
          inv.status = 'PAID';
        });
        this.filteredInvoices = [...this.invoices];
        alert('All invoices paid successfully!');
      },
      error: (err:any) => console.error('Error paying all invoices', err)
    });
  }
  onPayInvoice(invoice: ARInvoice, amount: number) {
    if (!amount || amount <= 0) return;
  
    this.arService.payInvoice(invoice.id, amount).subscribe({
      next: (updatedInvoice:ARInvoice) => {
        const index = this.invoices.findIndex(inv => inv.id === invoice.id);
        if (index !== -1) {
          this.invoices[index] = updatedInvoice;
          this.filteredInvoices = [...this.invoices]; // refresh table
        }
        alert(`Invoice ${updatedInvoice.invoiceNumber} paid successfully`);
      },
      error: (err:any) => console.error('Error recording payment', err)
    });
  }

  remindedInvoices: Set<number> = new Set();

  sendReminders() {
    this.arService.sendReminders().subscribe({
      next: () => {
        this.invoices.forEach(inv => {
          if (inv.status?.toLowerCase() === 'pending') {
            this.remindedInvoices.add(inv.id);
          }
        });
  
        this.filteredInvoices = [...this.invoices];
        alert('Reminders sent successfully!');
      },
      error: (err:any) => console.error('Error sending reminders', err)
    });
  }

  isDueThisWeek(dateStr: string): boolean {
    const today = new Date();
    const dueDate = new Date(dateStr);
    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);
    return dueDate >= today && dueDate <= weekFromNow;
  }

  // SEARCH & FILTER
  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterInvoices();
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.target.value;
    this.filterInvoices();
  }

  filterInvoices() {
    this.filteredInvoices = this.invoices.filter((inv) => {
      const matchesSearch = this.searchTerm
        ? inv.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          inv.invoiceNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesStatus =
        this.selectedStatus === 'all'
          ? true
          : inv.status.toLowerCase() === this.selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }

  // ADD INVOICE
  openAddInvoice() {
    this.isAddInvoiceOpen = true;
  }

  closeAddInvoice() {
    this.isAddInvoiceOpen = false;
    this.resetNewInvoice();
  }

 

  resetNewInvoice() {
    this.newInvoice = {
      id: 0,
      customerName: '',
      invoiceNumber: '',
      invoiceDate: '',
      dueDate: '',
      amount: 0,
      balance: 0,
      status: 'PENDING',
    };
  }

  overdueTotal: number = 0;
  totalReceivables: number = 0;
  dueThisWeekTotal: number = 0;

  calculateTotals() {
    if (!this.invoices) return;

    const today = new Date();
    const weekAhead = new Date();
    weekAhead.setDate(today.getDate() + 7);

    this.totalReceivables = this.invoices.reduce((sum, inv) => sum + inv.amount, 0);

    this.overdueTotal = this.invoices
      .filter((inv) => inv.status.toLowerCase() === 'overdue')
      .reduce((sum, inv) => sum + inv.amount, 0);

    this.dueThisWeekTotal = this.invoices
      .filter((inv) => {
        const dueDate = new Date(inv.dueDate);
        return dueDate >= today && dueDate <= weekAhead;
      })
      .reduce((sum, inv) => sum + inv.amount, 0);
  }

  // DELETE INVOICE
  deleteInvoice(invoiceId: number) {
    this.arService.deleteInvoice(invoiceId).subscribe({
      next: () => {
        this.invoices = this.invoices.filter((inv) => inv.id !== invoiceId);
        this.filterInvoices();
        this.loadCustomerCount();
      },
      error: (err: any) => console.error('Error deleting invoice', err),
    });
  }

  // Helper for status badge styling
  getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'overdue':
        return 'bg-red-100 text-red-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'paid':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }
}
