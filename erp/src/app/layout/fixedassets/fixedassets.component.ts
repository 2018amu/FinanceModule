import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FixedAssetService, FixedAsset } from '../../services/fixedasset.service';

@Component({
  selector: 'app-fixedassets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fixedassets.component.html',
  styleUrls: ['./fixedassets.component.css'],
})
export class FixedassetsComponent implements OnInit {

  currentTab: string = 'assetslist';
  searchText: string = '';
  filterStatus: string = 'all';

  assets: FixedAsset[] = [];

  summary = {
    totalAssetsValue: 0,
    totalDepreciation: 0,
    netBookValue: 0,
    activeAssetsCount: 0,
  };

  showForm: boolean = false;

  newAsset: any = {
    assetName: '',
    category: '',
    purchaseDate: '',
    purchaseValue: 0,
    currentValue: 0,
    status: 'ACTIVE',
    accumulatedDepreciation: 0,
  };

  openAddForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }
  selectedAsset: FixedAsset | null = null;
  showViewForm: boolean = false;

  viewAsset(asset: FixedAsset) {
    this.selectedAsset = asset;
    this.showViewForm = true;
  }
  closeViewForm() {
    this.showViewForm = false;
    this.selectedAsset = null;
  }

  deleteAsset(id: number) {
    if (confirm("Are you sure you want to dispose this asset?")) {
      this.assetService.delete(id).subscribe({
        next: () => {
          this.loadAssets();
          this.loadSummary();
        },
        error: (err: any) => {
          console.error("Full backend error:", err);
          alert("Delete failed. Check backend logs.");
        }
      });
    }
  }

  constructor(private assetService: FixedAssetService) {}

  saveAsset() {
    if (!this.newAsset.assetName || !this.newAsset.purchaseDate) {
      alert('Please fill required fields');
      return;
    }

    this.newAsset.currentValue = this.newAsset.purchaseValue;

    this.assetService.add(this.newAsset).subscribe({
      next: () => {
        this.loadAssets();
        this.loadSummary();
        this.closeForm();

        // reset form
        this.newAsset = {
          assetName: '',
          category: '',
          purchaseDate: '',
          purchaseValue: 0,
          currentValue: 0,
          status: 'ACTIVE',
          accumulatedDepreciation: 0,
        };
      },
      error: (err: any) => {
        console.error('Error saving asset:', err);
        alert('Failed to save asset');
      },
    });
  }

  ngOnInit() {
    this.loadAssets();
    this.loadSummary();
  }

  //  LOAD DATA FROM DB
  loadAssets() {
    this.assetService.getAll().subscribe((data) => {
      this.assets = data;
    });
  }

  //  LOAD SUMMARY CARDS
  loadSummary() {
    this.assetService.getSummary().subscribe((data) => {
      this.summary = data;
    });
  }

  //  ADD ASSET
  addAsset() {
    this.assetService.add(this.newAsset).subscribe(() => {
      alert('Asset added successfully');
      this.loadAssets();
      this.loadSummary();

      // Reset form
      this.newAsset = {
        assetName: '',
        category: '',
        purchaseDate: '',
        purchaseValue: 0,
        currentValue: 0,
        status: 'ACTIVE',
        accumulatedDepreciation: 0,
      };
    });
  }

  runDepreciation() {
    this.assetService.runDepreciation().subscribe(() => {
      alert('Depreciation calculated');
      this.loadAssets();
      this.loadSummary();
    });
  }

  //  FILTER LOGIC
  filteredAssets() {
    return this.assets.filter((asset) => {
      const matchesSearch =
        asset.assetName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (asset.id + '').includes(this.searchText);

      const matchesStatus = this.filterStatus === 'all' || asset.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  // Tabs
  setTab(tab: string) {
    this.currentTab = tab;
  }
}
