import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fixedassets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fixedassets.component.html',
  styleUrls: ['./fixedassets.component.css']
})
export class FixedassetsComponent {

  currentTab: string = 'assetslist';

  searchText: string = '';
  filterStatus: string = 'all';

  // ✅ Sample Data
  assets = [
    {
      id: 'FA-001',
      name: 'Office Building',
      category: 'Property',
      purchaseDate: '2020-01-15',
      purchaseValue: 150000,
      currentValue: 130000,
      status: 'Active'
    },
    {
      id: 'FA-002',
      name: 'Delivery Van',
      category: 'Vehicle',
      purchaseDate: '2022-05-10',
      purchaseValue: 40000,
      currentValue: 32000,
      status: 'Active'
    },
    {
      id: 'FA-003',
      name: 'Old Machine',
      category: 'Equipment',
      purchaseDate: '2018-03-20',
      purchaseValue: 25000,
      currentValue: 0,
      status: 'Disposed'
    }
  ];

  setTab(tab: string) {
    this.currentTab = tab;
  }

  //  FILTER LOGIC
  filteredAssets() {
    return this.assets.filter(asset => {

      const matchesSearch =
        asset.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        asset.id.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.filterStatus === 'all' ||
        asset.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

}
