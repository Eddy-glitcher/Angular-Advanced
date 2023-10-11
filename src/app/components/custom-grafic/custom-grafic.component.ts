import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-custom-grafic',
  templateUrl: './custom-grafic.component.html',
  styleUrls: ['./custom-grafic.component.scss']
})
export class CustomGraficComponent implements OnInit {

  @Input() title: string = 'Grafic Custom Component';
  @Input() labels: string[] = [];
  @Input() inputProgressData: any = {};

  ngOnInit(): void {
    this.doughnutChartData.datasets = this.inputProgressData;
    this.doughnutChartData.labels = this.labels;
  }

  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
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
