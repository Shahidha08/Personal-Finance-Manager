import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from '../../services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  standalone:false,
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  categories: string[] = ['All', 'Food', 'Transport', 'Bills', 'Entertainment'];
  selectedCategory: string = 'All';
  searchAmount: string = '';

  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
      this.filteredExpenses = [...data]; // clone to avoid direct mutation
    });
  }

  filterExpenses(): void {
    this.filteredExpenses = this.expenses.filter(expense => {
      const categoryMatch =
        this.selectedCategory === 'All' || expense.category === this.selectedCategory;
  
      const amountMatch =
        !this.searchAmount || expense.amount <= Number(this.searchAmount.trim());
  
      return categoryMatch && amountMatch;
    });
  }

  editExpense(id: number): void {
    this.router.navigate(['/expenses', id]);
  }

  deleteExpense(id: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe(() => this.loadExpenses());
    }
  }
}