import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-custom-grafic',
  templateUrl: './custom-grafic.component.html',
  styleUrls: ['./custom-grafic.component.scss']
})
export class CustomGraficComponent implements OnInit {


  ngOnInit(): void {
    this.doughnutChartData.datasets[0] = this.inputProgressData;
  }

  @Input() inputProgressData : any ={
    data: [350, 450, 100],
    backgroundColor: ['#2362F2','#4523F9','#4562F2'],
    hoverBackgroundColor: ['#2362F2','#4523F9','#4562F2'],
    hoverBorderColor:['#000000','#000000','#000000']
  };

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Products Sales',
    'In-Store Products',
    'Mail-Order Products',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      this.inputProgressData
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
