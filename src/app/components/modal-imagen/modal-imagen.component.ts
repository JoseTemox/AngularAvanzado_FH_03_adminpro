import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagneService: ModalImagenService,
    public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagneService.cerrarModal();
  }
  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }
  subirImagen(){

    const id = this.modalImagneService.id;
    const tipo = this.modalImagneService.tipo;
    this.fileUploadService.actualizarFoto( this.imagenSubir,tipo,id)
    .then(img => {
      Swal.fire('Guardado','Imagen Actualizada','success');
      this.modalImagneService.nuevaImagen.emit(img);
      this.cerrarModal();

    }).catch( err => {
      console.log(err);
      Swal.fire('Error',err.error.msg,'error');
    });

  }

}
