import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService, Expense } from '../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  standalone:false,
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;
  isEditMode = false;
  expenseId!: number;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.expenseId = +id;
        this.expenseService.getExpense(this.expenseId).subscribe(expense => {
          this.expenseForm.patchValue(expense);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) return;

    const formValue = this.expenseForm.value;
    const expense: Expense = {
      ...formValue,
      date: new Date(formValue.date).toISOString().split('T')[0] // format yyyy-mm-dd
    };

    if (this.isEditMode) {
      this.expenseService.updateExpense(this.expenseId, expense).subscribe(() => {
        this.router.navigate(['/expenses']);
      });
    } else {
      this.expenseService.addExpense(expense).subscribe(() => {
        this.router.navigate(['/expenses']);
      });
    }
  }
}