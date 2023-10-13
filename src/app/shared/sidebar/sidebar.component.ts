import { Component } from '@angular/core';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  menuItems : any[] = [];

  constructor( private sideBarService: SideBarService){
    this.menuItems = this.sideBarService.menu;
  }

}
