import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  // menu: any [] = [
  //   {
  //     titulo: 'DashBoard!!',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Gráficas', url: 'grafica1'},
  //       {titulo: 'Main', url: '/'},
  //       {titulo: 'ProgressBar', url: 'progress'},
  //       {titulo: 'Promesas', url: 'promesas'},
  //       {titulo: 'Rxjs', url: 'rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos!!',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: 'usuarios'},
  //       {titulo: 'Hospitales', url: 'hospitales'},
  //       {titulo: 'Médicos', url: 'medicos'},
  //     ]
  //   }
  // ];

  // constructor() { }
}
