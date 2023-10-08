import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.scss']
})
export class IncreaserComponent implements OnInit {

  ngOnInit(): void {
    this.progressBarColorClass = `btn ${this.progressBarColorClass}`;
  }

  // Recibimos el valor de la barra de progreso
  @Input() totalProgressBar: number = 50;

  // Recibimos la clase que asigna el color a los btns del incrementador
  @Input() progressBarColorClass: string = 'btn-primary';

  // Enviamos el progreso acumulado
  @Output() progressBarValueOutput : EventEmitter<number> = new EventEmitter();

  get getCurrentProgressBar(){
    return `${this.totalProgressBar}%`;
  }

  setProgressBarValue(newValue : number){
    this.totalProgressBar = this.totalProgressBar + newValue;
    this.progressBarValueOutput.emit(this.totalProgressBar);
  }

  onProgresBarChange(newValue: number){

    if(newValue > 100){
      newValue = 100;
    }else

    if(newValue <= 0 || newValue == null){
      newValue = 0;
    }

    this.progressBarValueOutput.emit(newValue);


  }

}
