import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../environments/environment.prod'; 

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions implements OnInit {
  @Input() accountId = 0;
  tdata: any[] = [];
  token = localStorage.getItem('token');
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const url = `${this.baseUrl}/api/transactions/${this.accountId}`;
    this.http.get(url, { headers }).subscribe({
      next: (res: any) => {
        this.tdata = res.reverse();
        console.log(this.tdata);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
