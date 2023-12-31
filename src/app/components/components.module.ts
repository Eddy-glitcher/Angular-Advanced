import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { CustomGraficComponent } from './custom-grafic/custom-grafic.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    IncreaserComponent,
    CustomGraficComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncreaserComponent,
    CustomGraficComponent
  ]
})
export class ComponentsModule { }
