import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment.prod'; // Adjust path if needed

export interface Transaction {
  id: number;
  amount: number;
  type: string;
  timestamp: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = `${environment.apiBaseUrl}/api/transactions`;

  constructor(private http: HttpClient) {}

  getTransactions(accountId: number): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Transaction[]>(`${this.apiUrl}/${accountId}`, { headers });
  }
}
