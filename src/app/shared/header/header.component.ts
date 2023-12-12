import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public imgUrl     : string = '';
  public activeUser : User;

  constructor(private UserService : UserService){
    this.imgUrl     = UserService.activeUser.getUserImage;
    this.activeUser = UserService.activeUser;
  };

  logOut(): void{
    this.UserService.logOut();
  };
}
