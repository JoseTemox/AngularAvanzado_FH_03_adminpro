import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';


import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number=0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImangenService: ModalImagenService
  ) { }
  ngOnDestroy(): void {

    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs =  this.modalImangenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => {
        console.log(img);
        this.cargarUsuarios()
      } );


  }

  cargarUsuarios(){

    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        //TODO: corregir que la paginacion pasa el valor
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
    })

  }

  cambiarPagina(valor: number){
    this.desde += valor;

    if( this.desde <0 ){
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ){
    // } else if ( this.desde > this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }



  buscar(termino: string ){

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios',termino)
    .subscribe( resp => {
      this.usuarios = resp
    });
  }

  eliminarUsuario(usuario: Usuario){

    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    }
    Swal.fire({
      title: 'Borrar Usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, borrar!'
    }).then((result) => {

      if(result.value){
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp =>  {
            this.cargarUsuarios()
            Swal.fire(
              'Usuario Borrado',
              `${usuario.nombre}, eliminado correctamente`,
              'success'
            );


          });
        }




      // if (result.isConfirmed) {
      //   this.usuarioService.eliminarUsuario(usuario)
      //   // Swal.fire(
      //   //   'Deleted!',
      //   //   'Your file has been deleted.',
      //   //   'success'
      //   // )
      // }
    })

  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario)
    .subscribe( resp => {
      console.log(resp);
    })

  }

  abrirModal(usuario: Usuario){
    this.modalImangenService.abrirModal('usuarios',usuario.uid,usuario.img);
  }


}
