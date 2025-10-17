import { Component, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../environments/environment.prod'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  statusMessage = '';
  baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  saveDataAndLogin() {
    const userData = { username: this.username, password: this.password };

    this.http.post(`${this.baseUrl}/api/auth/login`, userData).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);
        localStorage.setItem('token', res.token);

        if (res.id && res.token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${res.token}`
          });

          this.ngZone.run(() => {
            this.http.get(`${this.baseUrl}/api/accounts/${res.id}`, { headers }).subscribe({
              next: (rr: any) => {
                console.log('Account response:', rr);
                this.router.navigate(['/app-userprofile', res.id]);
              },
              error: (err: any) => {
                console.error('Account fetch failed:', err);
                this.statusMessage = '❌ Failed to fetch account details.';
                alert('Unable to retrieve account info.');
              }
            });
          });
        } else {
          this.statusMessage = '⚠️ Login response invalid. Please check credentials.';
          alert('Sorry, you are not authorized.');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        if (err.status === 401) {
          this.statusMessage = '❌ Invalid username or password.';
        } else {
          this.statusMessage = '❌ Login failed due to server error.';
        }
        alert('Sorry, you are not authorized.');
      }
    });
  }
}
