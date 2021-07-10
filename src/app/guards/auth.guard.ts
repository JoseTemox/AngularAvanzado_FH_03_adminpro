import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    //   this.usuarioService.validartoken()
    //       .subscribe( resp => {
    //         console.log(resp)
    //       })

    // console.log('CanActive');
    return this.usuarioService.validartoken()
      .pipe(
        tap( estaAutenticado => {

          if(!estaAutenticado){
            this.router.navigateByUrl('login');
          }
        })
      )
  }
  
}
