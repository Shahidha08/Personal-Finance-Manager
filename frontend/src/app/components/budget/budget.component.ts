import { Component, OnInit } from '@angular/core';
import { BudgetService, Budget } from '../../services/budget.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  standalone:false,
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budgetForm!: FormGroup;
  budgets: Budget[] = [];
  categories: string[] = ['Food', 'Transport', 'Bills', 'Entertainment'];

  constructor(
    private budgetService: BudgetService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.budgetForm = this.fb.group({
      category: ['', Validators.required],
      limit: [0, [Validators.required, Validators.min(1)]]
    });

    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getBudgets().subscribe((data: Budget[]) => {
      console.log('Loaded Budgets:', data);
      this.budgets = data.sort((a, b) => a.category.localeCompare(b.category));
    });
  }

  onSubmit(): void {
    const budget: Budget = this.budgetForm.value;

    this.budgetService.addOrUpdateBudget(budget).subscribe(() => {
      this.loadBudgets(); // Refresh table
      this.resetForm();   // Clear form
    });
  }

  editBudget(budget: Budget): void {
    this.budgetForm.patchValue({
      category: budget.category,
      limit: budget.limit
    });
  }

  deleteBudget(id: number): void {
    if (confirm('Are you sure you want to delete this budget?')) {
      this.budgetService.deleteBudget(id).subscribe(() => this.loadBudgets());
    }
  }

  resetForm(): void {
    this.budgetForm.reset();
  }
}