import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Viewprofile } from '../viewprofile/viewprofile';
import { Transfer } from '../transfer/transfer';
import { DepositComponent } from '../deposit/deposit';
import { Transactions } from '../transactions/transactions';
import { WithdrawComponent } from "../withdraw/withdraw";
import { Dashboard } from "../dashboard/dashboard";
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod'; 

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Viewprofile,
    Transfer,
    DepositComponent,
    Transactions,
    WithdrawComponent,
    Dashboard
  ],
  templateUrl: './userprofile.html',
  styleUrls: ['./userprofile.scss']
})
export class Userprofile implements OnInit {
  userId: number = 0;
  accountType: string = '';
  accountdata: any;
  token: string = '';
  viewdetails: any[] = [];

  showProfile = false;
  showTransfer = false;
  showDeposit = false;
  showTransactions = false;
  showWithdraw = false;
  showPolicies = false;
  showDashboard = false;

  highlightedPolicy: { label: string; message: string } | null = null;
  baseUrl = environment.apiBaseUrl;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    localStorage.setItem('userid', this.userId.toString());

    this.route.queryParams.subscribe(params => {
      this.accountType = params['accountType'] || '';
      this.token = localStorage.getItem('token') || '';

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });

      const url = `${this.baseUrl}/api/accounts/${this.userId}`;

      this.http.get(url, { headers }).subscribe({
        next: (res: any) => {
          this.accountdata = res;

          const balance = this.accountdata[0]?.balance || 0;
          if (balance < 10000) {
            this.highlightedPolicy = {
              label: "💡 Maintain Minimum Balance",
              message: "Your balance is below ₹10,000. Avoid penalties by maintaining the minimum required balance."
            };
          } else if (balance < 100000) {
            this.highlightedPolicy = {
              label: "📈 Eligible for SmartSaver Plan",
              message: "You qualify for our SmartSaver plan with 4.5% interest and zero ATM fees."
            };
          } else if (balance < 500000) {
            this.highlightedPolicy = {
              label: "💼 Premium Banking Benefits",
              message: "Unlock premium support, higher withdrawal limits, and cashback offers."
            };
          } else {
            this.highlightedPolicy = {
              label: "🏦 Wealth Management Advisory",
              message: "You’re eligible for personalized investment guidance and portfolio tracking."
            };
          }
        },
        error: (err) => {
          alert("Error fetching account data");
          console.error('❌ KYC PENDING', err);
        }
      });
    });
  }

  resetViews() {
    this.showProfile = false;
    this.showTransfer = false;
    this.showDeposit = false;
    this.showTransactions = false;
    this.showWithdraw = false;
    this.showPolicies = false;
    this.showDashboard = false;
  }

  loadProfile() {
    this.resetViews();
    this.showProfile = true;
  }

  loadTransactions() {
    this.resetViews();
    this.showTransactions = true;
  }

  deposit() {
    this.resetViews();
    this.showDeposit = true;
  }

  Transfer() {
    this.resetViews();
    this.showTransfer = true;
  }

  withdraw() {
    this.resetViews();
    this.showWithdraw = true;
  }

  loadPolicies() {
    this.resetViews();
    this.showPolicies = true;
  }

  loadDashboard() {
    this.resetViews();
    this.showDashboard = true;
  }

  loadSame() {
    this.resetViews();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  vie(view: Viewprofile) {
    const profile = view.pro();
    if (profile) {
      this.viewdetails = [profile];
    } else {
      alert('Profile not loaded yet. Please wait a moment.');
    }
  }
}
