import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransactionService, Transaction } from '../transaction.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnChanges {
  @Input() accountId: number | undefined;
  transactions: Transaction[] = [];
  isLoading = false;
  errorMessage = '';

  chartLabels: string[] = [];
  chartData: number[] = [];

  chartType: ChartType = 'line';
  chartDataSet: any;
  chartOptions: any;
accountNumber: any;

  constructor(private transactionService: TransactionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountId'] && this.accountId) {
      this.fetchTransactions();
    }
  }

  fetchTransactions(): void {
    this.isLoading = true;
    this.transactionService.getTransactions(this.accountId!).subscribe({
      next: (data) => {
        this.transactions = data;
        this.prepareChartData(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load transactions.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  prepareChartData(data: Transaction[]): void {
    const sorted = [...data].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    let balance = 0;
    this.chartLabels = [];
    this.chartData = [];

    for (const tx of sorted) {
      const timeLabel = new Date(tx.timestamp).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const amount = tx.type === 'DEPOSIT' ? tx.amount : -tx.amount;
      balance += amount;

      this.chartLabels.push(timeLabel);
      this.chartData.push(balance);
    }

    this.chartDataSet = {
      labels: this.chartLabels,
      datasets: [
        {
          data: this.chartData,
          label: 'Account Balance Over Time',
          borderColor: '#00796B',
          backgroundColor: 'rgba(0,150,136,0.2)',
          pointBackgroundColor: '#00796B',
          pointBorderColor: '#004D40',
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 4
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#333',
            font: { size: 12, weight: 'bold' }
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#f5f5f5',
          titleColor: '#00796B',
          bodyColor: '#333'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date & Time',
            color: '#555',
            font: { size: 14 }
          },
          ticks: {
            color: '#444',
            maxRotation: 45,
            minRotation: 30
          }
        },
        y: {
          title: {
            display: true,
            text: 'Balance (₹)',
            color: '#555',
            font: { size: 14 }
          },
          ticks: {
            color: '#444',
            callback: (value: number) => `₹${value.toLocaleString('en-IN')}`
          }
        }
      }
    };
  }
}
