import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, catchError, of, retry, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormLogin } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';

declare const google : any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.url;

  constructor( private http : HttpClient, private router : Router) { };

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
          localStorage.setItem('token', JSON.stringify(resp.token));
        }
      ),
      retry(1),
      catchError( (error: HttpErrorResponse) => throwError(()=>error))
    );
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
    google.accounts.id.revoke('luisgonzales6893@gmail.com', ()=>{
      this.router.navigateByUrl('/login');
    });
  };

};
