import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Budget {
  id?: number;
  category: string;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:3000/api/budget'; // Change if your backend is on a different port

  constructor(private http: HttpClient) {}

  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.baseUrl);
  }

  addOrUpdateBudget(budget: Budget): Observable<any> {
    return this.http.post(this.baseUrl, budget);
  }

  updateBudget(id: number, budget: Budget): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, budget);
  }

  deleteBudget(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}