import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuariosService: UsuarioService,
    private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):   boolean  {

      if(this.usuariosService.role === 'ADMIN_ROLE'){
        return true;

      }else {
        this.router.navigateByUrl('/dashboard');
        return false;
      }


      // return (this.usuariosService.role === 'ADMIN_ROLE') ? true : false;
  }

}
