import { Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ChartOfAccountsComponent } from './layout/chartofaccounts/chartofaccounts.component';
import {GeneralLedgerComponent}  from './layout/general-ledger/general-ledger.component'
import { AccountspayableComponent } from './layout/accountspayable/accountspayable.component';
import { AccountsrecievableComponent } from './layout/accountsrecievable/accountsrecievable.component';
import { FixedassetsComponent } from './layout/fixedassets/fixedassets.component';
import { DomaincomparisonComponent } from './layout/domaincomparison/domaincomparison.component';
import { FinancialreportsComponent } from './layout/financialreports/financialreports.component';
import { BudgetComponent } from './layout/budgeting/budgeting.component';
import { BankandreconciliationComponent } from './layout/bankandreconciliation/bankandreconciliation.component';
import { UserComponent } from './layout/usermanagement/usermanagement.component';
import { ModulesetupComponent } from './layout/modulesetup/modulesetup.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'chartofaccounts',
    component: ChartOfAccountsComponent
  },
  {
    path: 'generalledger',
    component: GeneralLedgerComponent
  },
  {
    path: 'accountspayable',
    component:AccountspayableComponent
  },
  {
    path: 'accountsrecievable',
    component:AccountsrecievableComponent
  },
  {
    path: 'fixedassets',
    component:FixedassetsComponent
  },
  {
    path: 'financialreports',
    component:FinancialreportsComponent
  },
  {
    path: 'budgeting',
    component:BudgetComponent
  },
  {
   path: 'bankandreconciliation',
   component:BankandreconciliationComponent
  },
  {
    path:'usermanagement',
    component:UserComponent
  },
  {
    path: 'domaincomparison',
    component:DomaincomparisonComponent

  },
  {
    path:'modulesetup',
    component:ModulesetupComponent

  },



];

