import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, catchError, of, retry, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormLogin } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const google : any;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public activeUser!: User;
  private baseUrl = environment.url;

  constructor( private http : HttpClient, private router : Router) {};

  createUser(formData: RegisterForm): Observable<any>{
    // console.log("Creando Usuario!!", url );

    const url = `${this.baseUrl}/users`;
    return this.http.post(url , formData).pipe(
      tap(
        (resp: any) => {
          localStorage.setItem('token', JSON.stringify(resp.token));
        }
      ),
      retry(1),
      catchError( (error: HttpErrorResponse) => throwError(()=>error))
    );
  };

  logIn(formData: FormLogin): Observable<any>{
    // console.log("Loggeando Usuario!!", url );

    const url = `${this.baseUrl}/api/login`;
    return this.http.post(url , formData).pipe(
      tap(
        (resp: any) => {
          console.log(resp);
          localStorage.setItem('token', JSON.stringify(resp.token));
        }
      ),
      retry(1),
      catchError( (error: HttpErrorResponse) => throwError(()=>error))
    );
  };

  googleInit(): Promise<any> {
    return new Promise( (resolve) => {
      google.accounts.id.initialize({
        client_id: "820936875597-e7h6f7kpt7j1n8t7254nliutom41rovl.apps.googleusercontent.com",
        callback: (response: any) => resolve(response)
        // Evitamos que la referencia al this en en handle metodo no cambie
      });
    });
  };

  logInGoogle(token: any): Observable<any>{
    // console.log("Loggeando Usuario!!", url );

    const url = `${this.baseUrl}/api/login/google`;
    return this.http.post(url , { token }).pipe(
      tap(
        (resp: any) => {
          localStorage.setItem('token', JSON.stringify(resp.token));
        }
      ),
      retry(1),
      catchError( (error: HttpErrorResponse) => throwError(()=>error))
    );
  };

  validateToken (): Observable<boolean>{

    let token = localStorage.getItem('token') || '';

    if(token){
      token = JSON.parse(token);
    };

    const url = `${this.baseUrl}/api/login/renew`;

    return this.http.get(url, {
      headers : {
        'token' : token
      }
    }).pipe(
      tap(
        (resp: any)=>{

          console.log(resp);
          const { name, email, image, role, uid } = resp.user;
          this.activeUser = new User(name, email, image, role, uid);
          localStorage.setItem('token', JSON.stringify(resp.token));
        }
      ),
      map(
        (resp)=>{
          return resp.ok;
        }
      ),
      catchError( (error: HttpErrorResponse) => of(false))
    );

  };

  logOut(): void{
    localStorage.removeItem('token');

    this.googleInit();

    google.accounts.id.revoke('luisgonzales6893@gmail.com', ()=>{
      this.router.navigateByUrl('/login');
    });
  };

};
