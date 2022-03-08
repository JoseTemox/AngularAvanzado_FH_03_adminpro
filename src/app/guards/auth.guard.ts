import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.usuarioService.validartoken()
    .pipe(
      tap( estaAutenticado => {

        if(!estaAutenticado){
          this.router.navigateByUrl('login');
        }
      })
    )
  }
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
