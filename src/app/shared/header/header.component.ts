import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
declare const gapi:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  constructor(private usuarioService: UsuarioService) { }

  logout(){
    this.usuarioService.logout();

    //para terminar de revocar las instancias de sesion
    this.revokeAllScopes();
  }

  revokeAllScopes() {
    gapi.auth2.getAuthInstance().disconnect();
  }

 
}
