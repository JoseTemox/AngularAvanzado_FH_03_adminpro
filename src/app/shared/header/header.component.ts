import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
declare const gapi:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {
   public imgUrl = '';
   public usuario: Usuario;

  constructor(private usuarioService: UsuarioService) { 
    // this.imgUrl = usuarioService.usuario.imageUrl;
    this.usuario = usuarioService.usuario
  }

  logout(){
    this.usuarioService.logout();

    //para terminar de revocar las instancias de sesion
    this.revokeAllScopes();
  }

  revokeAllScopes() {
    gapi.auth2.getAuthInstance().disconnect();
  }

 
}
