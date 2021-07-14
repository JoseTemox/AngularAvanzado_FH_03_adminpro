import { environment } from "src/environments/environment"

const base_url = environment.base_url;


export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ){}

    get imageUrl(){
        //  upload/usuarios/77fcfbbc-15ba-4c47-8888-0cb91f498fe.png
        
        if(this.img.includes('https')){
            return this.img;
        }
        if(this.img) {
            return `${ base_url }/upload/usuarios/${this.img}`;
        }else{
            return `${ base_url }/upload/usuarios/no-image`;
        }

        return ''
    }

    
}