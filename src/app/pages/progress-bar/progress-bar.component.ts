import { Component } from '@angular/core';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  progressBarValue1 : number = 20;
  progressBarValue2 : number = 30;


  get getProgressBarValue1(){
    return `${this.progressBarValue1}%` ;
  }

  get getProgressBarValue2(){
    return `${this.progressBarValue2}%` ;
  }

  progressBarValueOutput(progressBarValue: number){
    this.progressBarValue1 = this.progressBarValue1 + progressBarValue;
  }

}
