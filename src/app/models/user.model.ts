export class User {
  constructor(

    // Las propiedades opcionales siempre van al final

      public name       : string,
      public email      : string,
      public image      : string,
      public passsword ?: string,
      public google    ?: boolean,
      public role      ?: string,
      public uid       ?: string
    ) {};

};
