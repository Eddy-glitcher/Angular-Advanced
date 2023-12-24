import { environment } from '../../environments/environment';

const url = environment.url;
export class User {
  constructor(

    // Las propiedades opcionales siempre van al final

      public name       : string,
      public email      : string,
      public image      : string,
      public role      ?: string,
      public uid       ?: string,
      public google    ?: boolean,
      public passsword ?: string
    ) {};

    // http://localhost:3000/api/uploads/users/
    get getUserImage(): string{

      if(this.image.includes('https')){
        return this.image;
      };

      if(this.image){
        return `${url}/api/uploads/users/${this.image}`;
      };

      return `${url}/api/uploads/users/no-image`;
    };

};
