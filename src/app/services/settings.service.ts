import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');


  constructor() {
    console.log('hola constructor servico settings');

    const themeStorage = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', themeStorage);
    //./assets/css/colors/default-dark.css

  }

  changeTheme(theme: string){

    const url = `./assets/css/colors/${theme}.css`

    this.linkTheme.setAttribute('href', url);

    localStorage.setItem('theme',url);
    this.checkCurrentTheme();


  }

  checkCurrentTheme(){
    const link=document.querySelectorAll('.selector');

    link.forEach( elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnthemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if(btnthemeUrl === currentTheme){
        elem.classList.add('working');
      }
    });
  }
}
