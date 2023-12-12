import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SideBarService } from 'src/app/services/side-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public imgUrl     : string = '';
  public activeUser : User;
  menuItems : any[] = [];

  constructor( private sideBarService: SideBarService, private UserService : UserService){
    this.menuItems  = this.sideBarService.menu;
    this.imgUrl     = UserService.activeUser.getUserImage;
    this.activeUser = UserService.activeUser;
  };

}
