import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';


const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'hospitales' |'medicos') {


      //  upload/usuarios/77fcfbbc-15ba-4c47-8888-0cb91f498fe.png

    if(!img){
        return `${ base_url }/upload/usuarios/no-image`;
    }else if(img.includes('https')){
        return img;
    }else if(img) {
        return `${ base_url }/upload/${ tipo }/${ img }`;
    }else{
        return `${ base_url }/upload/usuarios/no-image`;
    }


  }

}
