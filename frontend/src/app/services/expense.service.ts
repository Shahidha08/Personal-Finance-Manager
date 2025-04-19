import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Expense {
  id?: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000/api/expenses';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  addExpense(expense: Expense): Observable<any> {
    return this.http.post<any>(this.apiUrl, expense);
  }

  

  updateExpense(id: number, expense: Expense): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}