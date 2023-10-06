import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.scss']
})
export class NopagefoundComponent {

  // Get the current year to show in the interface.
  currentYear : number = new Date().getFullYear();

  navigateTo(){
    this.router.navigate(['./dashboard/']);
  }

  constructor(private router : Router){}

}
