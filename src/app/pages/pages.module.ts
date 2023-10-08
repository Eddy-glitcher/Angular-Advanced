import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafic1Component } from './grafic1/grafic1.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    Grafic1Component,
    ProgressBarComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PagesRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  exports:[
    DashboardComponent,
    Grafic1Component,
    ProgressBarComponent,
    PagesComponent
  ]
})
export class PagesModule { }
