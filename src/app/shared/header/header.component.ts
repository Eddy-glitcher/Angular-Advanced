import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public activeUser : User;

  constructor(private UserService : UserService){
    this.activeUser = UserService.activeUser;
  };

  logOut(): void{
    this.UserService.logOut();
  };
}
