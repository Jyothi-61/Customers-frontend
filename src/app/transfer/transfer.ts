import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment.prod'; 

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss'
})
export class Transfer {
  @Input() fromAccountNumber: string = '';
  @Input() token: string = localStorage.getItem('token') || '';

  toAccountNumber: string = '';
  amount: number = 0;
  statusMessage: string = '';
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  transff() {
    if (!this.fromAccountNumber || !this.toAccountNumber || this.amount <= 0 || this.amount > 10000) {
      this.statusMessage = '⚠️ Please enter valid account numbers and amount.';
      alert('⚠️ Please enter valid account numbers and amount. ' + this.toAccountNumber);
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const url = `${this.baseUrl}/api/transactions/transfer`;

    const body = {
      fromAccountNumber: this.fromAccountNumber,
      toAccountNumber: this.toAccountNumber,
      amount: this.amount
    };

    this.http.post(url, body, { headers }).subscribe({
      next: (res: any) => {
        this.statusMessage = `✅ ₹${this.amount} transferred successfully from ${this.fromAccountNumber} to ${this.toAccountNumber}.`;
        alert(this.statusMessage);
        this.amount = 0;
        this.toAccountNumber = '';
      },
      error: (err) => {
        console.error('❌ Transfer failed:', err);
        this.statusMessage = `❌ Transfer failed: ${err.status} ${err.statusText}`;
      }
    });
  }
}
