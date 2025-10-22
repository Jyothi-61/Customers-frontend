import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment.prod';
 // Adjust path if needed

@Component({
  selector: 'app-createprofile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createprofile.html',
  styleUrls: ['./createprofile.scss']
})
export class Createprofile implements OnInit {
  profile = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    dateOfBirth: '',
    kycStatus: 'PENDING',
    user: {
      id: 0
    }
  };

  token: string = '';
  accountType = '';
  submissionMessage: string = '';
  pollingActive: boolean = false;
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    const tokenParam = this.route.snapshot.queryParamMap.get('token');

    this.profile.user.id = userId;
    this.token = tokenParam ?? '';
  }

 onSubmit() {
  const profileUrl = `${this.baseUrl}/api/customer/profile/create`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  this.http.post(profileUrl, this.profile, { headers }).subscribe({
    next: (res) => {
      this.submissionMessage = '✅ Profile created successfully. Waiting for KYC approval...';

      const url = `${this.baseUrl}/api/customer/profile/${this.profile.user.id}`;
      const intervalId = setInterval(() => {
        this.http.get(url, { headers }).subscribe({
          next: (res1: any) => {
            console.log("✅ Fetched customer details:", res1);

            if (res1.kycStatus === "APPROVED") {
              this.submissionMessage = '🎉 KYC Approved! Opening account...';

              const openAccountUrl = `${this.baseUrl}/api/accounts/open/${this.profile.user.id}/COIM05678901?accountType=${this.accountType}`;
              this.http.post(openAccountUrl, null, { headers }).subscribe({
                next: (ress: any) => {
                  console.log(ress);
                  this.submissionMessage = '✅ Account opened successfully!';
                  clearInterval(intervalId);
                  this.router.navigate(['/app-userprofile', this.profile.user.id]);
                },
                error: (e) => {
                  console.log(e);
                  this.submissionMessage = '❌ Failed to open account.';
                }
              });
            }
          },
          error: (err) => {
            console.error("❌ Error fetching profile:", err);
            this.submissionMessage = '❌ Error fetching profile.';
          }
        });
      }, 3000);
    },
    error: (er) => {
      console.error('❌ Profile creation failed:', er);
      this.submissionMessage = '❌ Failed to create profile.';
    }
  });
}

}
