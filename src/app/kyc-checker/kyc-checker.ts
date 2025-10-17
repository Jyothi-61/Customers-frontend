import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment.prod';// Adjust path if needed

@Component({
  selector: 'app-kyc-checker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kyc-checker">
      <h2>Checking KYC Status...</h2>
      <p *ngIf="message">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./kyc-checker.scss']
})
export class KycStatusChecker implements OnInit {
  userId: number = 0;
  token: string = '';
  accountType: string = '';
  message: string = '';
  baseUrl = environment.apiBaseUrl;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.accountType = this.route.snapshot.queryParamMap.get('accountType') ?? '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const profileUrl = `${this.baseUrl}/api/customer/profile/${this.userId}`;

    this.http.get(profileUrl, { headers }).subscribe({
      next: (res: any) => {
        if (res.kycStatus === 'APPROVED') {
          this.message = 'KYC Approved. Redirecting to dashboard...';
          const openAccountUrl = `${this.baseUrl}/api/accounts/open/${this.userId}/COIM05678901?accountType=${this.accountType}`;
          this.http.post(openAccountUrl, null, { headers }).subscribe({
            next: () => this.router.navigate(['/app-userprofile', this.userId]),
            error: () => this.message = '❌ Failed to open account.'
          });
        } else {
          this.message = '⏳ KYC still pending. Please check back later.';
        }
      },
      error: () => {
        this.message = '❌ Error checking KYC status.';
      }
    });
  }
}
