import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafic1Component } from './grafic1/grafic1.component';
import { PagesComponent } from './pages.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';

const routes: Routes = [
  { path: 'dashboard',
  component: PagesComponent,
  children:[
    { path: '', component: DashboardComponent },
    { path: 'progress', component: ProgressBarComponent },
    { path: 'grafic1', component: Grafic1Component },
  ]
  },
  {
    path: '**',
    component : NopagefoundComponent
  }
},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
