import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
    background-color: transparent;
    }`
    ]
})
export class SidebarComponent implements OnInit {

  // public imgUrl= ''
  public usuario: Usuario;

  // menuItems: any = []

  constructor( public sidebarService: SidebarService,
    private usuarioService : UsuarioService) {
    // this.menuItems = this.sidebarService.menu;
    // this.imgUrl = usuarioService.usuario.imageUrl;
    this.usuario = usuarioService.usuario;
    console.log(this.usuario.imageUrl);

    // console.log(this.menuItems);
   }

  ngOnInit(): void {
  }

}
