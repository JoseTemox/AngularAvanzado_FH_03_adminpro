import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { MedicosService } from '../../../services/medicos.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public cargando = true;
  private imgSubs: Subscription;

  constructor(private medicosService: MedicosService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.imgSubs =  this.modalImagenService.nuevaImagen
    .pipe(delay(200))
    .subscribe( img => {
      console.log(img);
      this.cargarMedicos();
    } );
  }

  cargarMedicos(){
    this.cargando = true;

    this.medicosService.cargarMedicos().subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);
  }

  buscar(termino: string ){

    if (termino.length === 0) {
      // return this.hospitales = this.hospitalesTemp;
      return this.cargarMedicos();
    }
    this.busquedaService.buscar('medicos',termino)
    .subscribe( resp => {
      this.medicos = resp
    });
  }

  borrarMedico(medico: Medico){

    Swal.fire({
      title: 'Borrar Usuario?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, borrar!'
    }).then((result) => {

      if(result.value){
        this.medicosService.borrarMedico(medico._id)
          .subscribe(resp =>  {
            this.cargarMedicos()
            Swal.fire(
              'Usuario Borrado',
              `${medico.nombre}, eliminado correctamente`,
              'success'
            );


          });
      }


    })

  }

}
