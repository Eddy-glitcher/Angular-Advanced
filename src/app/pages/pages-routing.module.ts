import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafic1Component } from './grafic1/grafic1.component';
import { PagesComponent } from './pages.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'dashboard',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children:[
    { path: '',                 component: DashboardComponent,       data: {title: 'DashBoard'     }},
    { path: 'progress',         component: ProgressBarComponent,     data: {title: 'ProgresBar'    }},
    { path: 'grafic1',          component: Grafic1Component,         data: {title: 'Grafics'       }},
    { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'AccountSttings'}},
    { path: 'promises',         component: PromisesComponent,        data: {title: 'Promises'      }},
    { path: 'rxjs',             component: RxjsComponent,            data: {title: 'Observables'   }},
  ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
