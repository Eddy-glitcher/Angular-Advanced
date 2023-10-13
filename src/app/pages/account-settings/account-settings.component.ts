import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settinsService : SettingsService){}

  ngOnInit(): void {
    this.settinsService.checkCurrentTheme();
  }

  changeThemeColors(colorTheme : string){
    this.settinsService.changeThemeColors(colorTheme);
  }
}
