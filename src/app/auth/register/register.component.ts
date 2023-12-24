import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    public formSubmitted: boolean = false;

    public registerForm : FormGroup = this.formBuilder.group({
      name     : ['Edier', Validators.required],
      email    : ['edier@hotmail.com', [ Validators.required, Validators.email ]],
      password : ['123', Validators.required],
      confirmPassword : ['123', Validators.required],
      terms : [false, Validators.required],
    }, {
      validators : this.equalPasswords('password', 'confirmPassword')
    } as FormControlOptions);

    constructor(private formBuilder : FormBuilder, private UserService : UserService, private router : Router){}

    createUser(){
      this.formSubmitted = true;

      if(this.registerForm.invalid){
        console.log("Error al crear el usuario!");
        return;
      };

      if(this.registerForm.get('terms')?.value){
        this.UserService.createUser(this.registerForm.value).subscribe({
          next  : (user : any) => {
            Swal.fire({
              title: 'Usuario Creado Correctamente!',
              icon: 'success',
              confirmButtonText: 'ok'
            });

            // Navegar al dashboard
            this.router.navigateByUrl('/dashboard');

            Swal.fire({
              title: 'Error al crear el token y redireccionar!',
              icon: 'error',
              confirmButtonText: 'ok'
            });
          },
          error : (error : HttpErrorResponse) => {
            console.log("Hay un error: ",error);
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

    invalidFormField(field : any): boolean{
      return this.registerForm.get(field)?.invalid && this.formSubmitted || false;
    };

    invalidPasswords(): boolean{

      const pass1 = this.registerForm.get('password')?.value;
      const pass2 = this.registerForm.get('confirmPassword')?.value;

      if((pass1 !== pass2) && this.formSubmitted){
        return true;
      }else{
        return false;
      };

    };

    equalPasswords(pass1: string, pass2: string){
      return (formGroup : FormGroup) => {
        const pass1Control = formGroup.get(pass1);
        const pass2Control = formGroup.get(pass2);

        if(pass1Control?.value === pass2Control?.value){
          pass2Control?.setErrors(null);
        }else{
          pass2Control?.setErrors({noEqual : true});
        };

      };
    };

    acceptTerms(): boolean{
      return !this.registerForm.get('terms')?.value && this.formSubmitted;
    };
};
