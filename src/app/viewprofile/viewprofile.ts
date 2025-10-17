import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-viewprofile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './viewprofile.html',
  styleUrls: ['./viewprofile.scss']
})
export class Viewprofile implements OnInit {
  userId: number = 0;
  accountType: string = '';
  token: string = '';
  profile: any = null;
  baseUrl = environment.apiBaseUrl;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  pro() {
    return this.profile ? [this.profile] : [];
  }

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    this.userId = Number(localStorage.getItem('userid')) || 0;

    if (!this.userId || !this.token) {
      alert('Invalid user ID or token');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const url = `${this.baseUrl}/api/customer/profile/${this.userId}`;

    this.http.get(url, { headers }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.profile = response;
      },
      error: (error) => {
        console.error('❌ Failed to fetch profile:', error);
        alert('Failed to load profile.');
      }
    });
  }
}
