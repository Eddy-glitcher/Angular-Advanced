import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private defaultTheme = document.querySelector('#theme');
  private themeId  = document.querySelector('#theme');
  private themeLinks!: NodeListOf<Element>;
  private currentTheme = document.querySelector('#theme');


  constructor() {
    const localTheme = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.defaultTheme?.setAttribute('href', localTheme);
  }

  changeThemeColors(colorTheme : string){
    const urlTheme = `./assets/css/colors/${colorTheme}.css`;
    this.themeId?.setAttribute('href', urlTheme);
    localStorage.setItem('theme', urlTheme);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.themeLinks = document.querySelectorAll('.selector');

      this.themeLinks.forEach((elem: Element) =>{
        elem.classList.remove('working');
        const btnTheme    = elem.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        const activeTheme = this.currentTheme?.getAttribute('href');

        if(btnThemeUrl === activeTheme){
          elem.classList.add('working');
        }
      })
  }

}
