import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FixedAssetService, FixedAsset } from '../../services/fixedasset.service'

@Component({
  selector: 'app-fixedassets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fixedassets.component.html',
  styleUrls: ['./fixedassets.component.css']
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
    activeAssetsCount: 0
  };
  openAddForm(){
    
  }

  // Form model
  newAsset: FixedAsset = {
    assetName: '',
    category: '',
    purchaseDate: '',
    purchaseValue: 0,
    currentValue: 0,
    status: 'ACTIVE',
    accumulatedDepreciation: 0
  };

  constructor(private assetService: FixedAssetService) {}

  ngOnInit() {
    this.loadAssets();
    this.loadSummary();
  }

  // ✅ LOAD DATA FROM DB
  loadAssets() {
    this.assetService.getAll().subscribe(data => {
      this.assets = data;
    });
  }

  // ✅ LOAD SUMMARY CARDS
  loadSummary() {
    this.assetService.getSummary().subscribe(data => {
      this.summary = data;
    });
  }

  // ✅ ADD ASSET
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
        accumulatedDepreciation: 0
      };
    });
  }

  // ✅ DELETE ASSET
  deleteAsset(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.assetService.delete(id).subscribe(() => {
        this.loadAssets();
        this.loadSummary();
      });
    }
  }

  // ✅ RUN DEPRECIATION
  runDepreciation() {
    this.assetService.runDepreciation().subscribe(() => {
      alert('Depreciation calculated');
      this.loadAssets();
      this.loadSummary();
    });
  }

  // ✅ FILTER LOGIC
  filteredAssets() {
    return this.assets.filter(asset => {

      const matchesSearch =
        asset.assetName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (asset.id + '').includes(this.searchText);

      const matchesStatus =
        this.filterStatus === 'all' ||
        asset.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  // Tabs
  setTab(tab: string) {
    this.currentTab = tab;
  }
}