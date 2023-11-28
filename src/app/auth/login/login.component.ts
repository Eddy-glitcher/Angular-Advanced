import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal  from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('btnGoogle') btnGoogle!: ElementRef<HTMLElement>;

  private formLoginSubmitted : boolean = false;

  public Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  formLogin  = this.formBuilder.group({
    email    : ['', [Validators.required, Validators.email]],
    password : ['javieee', [Validators.required]],
    remember : [false]
  });

  constructor(private router : Router, private formBuilder : FormBuilder, private UserService : UserService){
    let localEmail = localStorage.getItem('email');
    if(localEmail){
      this.formLogin.get('email')?.setValue(JSON.parse(localEmail || ''));
    };
  };

  ngAfterViewInit(): void {
    this.googleAuthInit();
  };

  googleAuthInit(){
    google.accounts.id.initialize({
      client_id: "820936875597-e7h6f7kpt7j1n8t7254nliutom41rovl.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
      // Evitamos que la referencia al this en en handle metodo no cambie
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.btnGoogle.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  };

  handleCredentialResponse(response : any){
    console.log("Encoded JWT ID token: " + response.credential);

    this.UserService.logInGoogle(response.credential).subscribe({

      next : (resp) => {
        console.log(resp);

          // Navegamos al dashboard!
          this.router.navigateByUrl('/dashboard');
        // Inicio de sesion exitoso alerta

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Iniciaste Sesión",
          showConfirmButton: false,
          timer: 1500
        });

      },
      error : (error : HttpErrorResponse) => {
        console.log(error);
      },

    });
  };


  invalidFormField(field: string){
    return this.formLogin.get(field)?.invalid && this.formLoginSubmitted || false;
  };

  logIn(){
    this.formLoginSubmitted = true;
    console.log(this.formLogin.value);

    this.UserService.logIn(this.formLogin.value).subscribe({
      next : (resp)=>{

        if(this.formLogin.get('remember')!.value){
          localStorage.setItem('email', JSON.stringify(this.formLogin.get('email')!.value));
        }else{
          localStorage.removeItem('email');
        };

        // Navegamos al dashboard!
        this.router.navigateByUrl('/dashboard');

        // Inicio de sesion exitoso Alerta
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Iniciaste Sesión",
          showConfirmButton: false,
          timer: 1500
        });

      },
      error : (error : HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.msj,
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    });
  };

};
