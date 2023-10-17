import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  menu : any[] = [
    {
      title   : 'Dashboard',
      icon    : 'mdi mdi-gauge',
      submenu : [
        { title : 'Main', url : './'},
        { title : 'Progressbar', url : './progress'},
        { title : 'Grafics', url : './grafic1'},
        { title : 'Promises', url : './promises'},
        { title : 'Rxjs', url : './rxjs'},
      ]
    }
  ]

  constructor() { }



}
