import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { BudgetComponent } from './components/budget/budget.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/new', component: ExpenseFormComponent },
  { path: 'expenses/:id', component: ExpenseFormComponent },
  { path: 'budget', component: BudgetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}