import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError, delay } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';


const base_url = environment.base_url;
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
   }

   get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(){
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  validartoken(): Observable<boolean>{

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        const { email, google, img='', nombre, role, uid } = resp.usuarioDB

        this.usuario = new Usuario(nombre,email,'',img,google,role,uid);
        localStorage.setItem('token', resp.token );
        return true;
      }),
      catchError( error => of(false))
    )
  }

  actualizarPerfil(data: { email: string, nombre: string, role:string}){

    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${ this.uid }`,data, this.headers);
  }

  crearUsuario( formData: RegisterForm){
    return this.http.post(`${ base_url }/usuarios`, formData)
              .pipe(
                tap( (resp: any) => {

                  localStorage.setItem('token',resp.token)
                  // console.log(resp);
                })
             );
  }

  login( formData: LoginForm){
    return this.http.post(`${ base_url }/login`, formData)
               .pipe(
                  tap( (resp: any) => {

                    localStorage.setItem('token',resp.token)
                    // console.log(resp);
                  })
               );
  }

  loginGoogle( token ){
    return this.http.post(`${ base_url }/login/google`, { token })
               .pipe(
                  tap( (resp: any) => {

                    localStorage.setItem('token',resp.token)
                    // console.log(resp);
                  })
               );
  }
  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');

      })
    });

  }



  googleInit(){

    return new Promise<void>(resolve => {

      gapi.load('auth2', () =>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '850971301867-ve9jekv37dd311bvrdjamh3v948veqvm.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve();
      });
    })
  }

  cargarUsuarios(desde: number =0){
    const url = `${base_url}/usuarios?desde=${ desde }`;

    return this.http.get<CargarUsuario>(url, this.headers)
            .pipe(
              // delay(5000),
              map(resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre,user.email, '',user.img,user.google, user.role,user.uid)
                )
                return {
                  total: resp.total,
                  usuarios
                };
              })
            )
  }

  eliminarUsuario(usuario : Usuario){

    const url = `${base_url}/usuarios/${ usuario.uid }`;

    return this.http.delete(url, this.headers)
  }

  guardarUsuario(usuario: Usuario){

    // data = {
    //   ...data,
    //   role: this.usuario.role
    // }
    return this.http.put(`${base_url}/usuarios/${ usuario.uid }`,usuario, this.headers);
  }
}
