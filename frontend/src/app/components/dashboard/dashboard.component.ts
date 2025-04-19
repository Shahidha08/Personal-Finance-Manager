import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from '../../services/expense.service';
import { BudgetService, Budget } from '../../services/budget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone:false,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  budgets: Budget[] = [];
  totalSpending = 0;
  spendingByCategory: { [key: string]: number } = {};

  constructor(
    private expenseService: ExpenseService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.calculateSpending();
    });

    this.budgetService.getBudgets().subscribe(budgets => {
      this.budgets = budgets;
    });
  }

  calculateSpending(): void {
    this.totalSpending = 0;
    this.spendingByCategory = {};

    for (const expense of this.expenses) {
      const amount = Number(expense.amount); // ✅ Convert to number to avoid string concat

      this.totalSpending += amount;

      if (!this.spendingByCategory[expense.category]) {
        this.spendingByCategory[expense.category] = 0;
      }

      this.spendingByCategory[expense.category] += amount;
    }
  }

  getBudgetLimit(category: string): number {
    const match = this.budgets.find(
      b => b.category.trim().toLowerCase() === category.trim().toLowerCase()
    );
    return match ? Number(match.limit) : 0;
  }

  isOverBudget(category: string): boolean {
    const spent = this.spendingByCategory[category] || 0;
    const limit = this.getBudgetLimit(category);
    return spent > limit;
  }

  getCategoryKeys(): string[] {
    const expenseCategories = Object.keys(this.spendingByCategory);
    const budgetCategories = this.budgets.map(b => b.category);
    const all = new Set([...expenseCategories, ...budgetCategories]);
    return Array.from(all);
  }
}