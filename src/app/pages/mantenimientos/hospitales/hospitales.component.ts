import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales : Hospital[] = [];
  public hospitalesTemp : Hospital[] = [];
  public cargando = true;
  private imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.imgSubs =   this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => {
        console.log(img);
        this.cargarHospitales()
      } );

  }

  cargarHospitales(){

    // this.cargando = true:
    this.hospitalService.cargarHospitales()
    .subscribe( hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;

    })
  }

  guardarCambios(hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id , hospital.nombre)
    .subscribe( resp => {


      Swal.fire('Actualizado', hospital.nombre, 'success');
    })
  }

  borrarHospital(hospital: Hospital){
    this.hospitalService.borrarHospital(hospital._id)
    .subscribe( resp => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    })
  }

  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })

    if( value.trim().length > 0){
      this.hospitalService.crearHospital(value)
      .subscribe((resp: any) => {
        // this.cargarHospitales();
        this.hospitales.push(resp.hospital)
        Swal.fire('Creado', value, 'success');

      })

    }

    console.log(value);

  }

  abrirModal(hospital : Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital._id,hospital.img);
  }

  buscar(termino: string ){

    if (termino.length === 0) {
      // return this.hospitales = this.hospitalesTemp;
      return this.cargarHospitales();
    }
    this.busquedaService.buscar('hospitales',termino)
    .subscribe( resp => {
      this.hospitales = resp
    });
  }

}

