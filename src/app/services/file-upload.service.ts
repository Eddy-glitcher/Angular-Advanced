import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  base_url: string = environment.url;

  constructor( private UserService : UserService ) { }

  async uploadFile(file : File, collection : 'users'|'doctors'|'hospitals', id: string){

    const url = `${this.base_url}/api/uploads/${collection}/${id}`;
    console.log("respuesta: ", url);

    const formData = new FormData();
    formData.append("image", file);

    try {

      const resp = await fetch(url, {
        method : 'POST',
        headers : {
          'token': this.UserService.getCurrentToken
        },
        body : formData
      });
      const data = await resp.json();

      if(data.ok){
        return data.imageName;
      }else{
        console.log(data.msj);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    };

  };
}
