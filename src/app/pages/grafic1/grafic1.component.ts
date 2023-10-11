import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
@Component({
  selector: 'app-grafic1',
  templateUrl: './grafic1.component.html',
  styleUrls: ['./grafic1.component.scss']
})
export class Grafic1Component {

  inputProgressData ={
    data: [400, 250, 250],
    backgroundColor: ['#70D6FF','#FF70A6','#FF9770'],
    hoverBackgroundColor: ['#70D6FF','#FF70A6','#FF9770'],
    hoverBorderColor:['#000000','#000000','#000000']
  };

    // Doughnut
    public doughnutChartLabels: string[] = [
      'Download Sales',
      'In-Store Sales',
      'Mail-Order Sales',
    ];
    public doughnutChartData: ChartData<'doughnut'> = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [350, 450, 100],
          backgroundColor: ['#00821C','#09DB36','#024D0F'],
          hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
          hoverBorderColor:['#000000','#000000','#00000003']
        }
      ]
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
