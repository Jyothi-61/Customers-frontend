import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-transaction-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './transaction-chart.html',
})
export class TransactionChartComponent {
  @Input() transactions: { date: string; amount: number }[] = [];

  public barChartLabels: string[] = [];
  public barChartData: ChartDataset[] = [{ data: [], label: 'Amount (₹)' }];
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Recent Transactions' }
    }
  };
  public barChartType: ChartType = 'bar';

  ngOnInit() {
    this.barChartLabels = this.transactions.map(tx => tx.date);
    this.barChartData[0].data = this.transactions.map(tx => tx.amount);
  }
}
