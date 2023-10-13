import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions() : Function;
// Con este código llamamos un archivo js para que se ejecute cada vez qque el componente que lo inicializa se reconstruye.

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ['']
})
export class PagesComponent implements OnInit {

  constructor(private settingsService : SettingsService){
  }

  ngOnInit(): void {
    customInitFunctions();
  }
}
