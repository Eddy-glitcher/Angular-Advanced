import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  submittedForm          : boolean = false;
  currentUser            : User;
  public uploadedImage!  : File;
  public temporaryImage  : string | null | ArrayBuffer = '';

  updateForm !:FormGroup;

  constructor( private formBuilder : FormBuilder, private UserService : UserService, private fileUploadService : FileUploadService){
    this.currentUser = UserService.activeUser;
  }

  ngOnInit(): void {
      this.updateForm = this.formBuilder.group({
        'name'            : [this.currentUser.name,  [Validators.required]],
        'email'           : [this.currentUser.email, [Validators.required, Validators.email]],
        // 'role'            : ['User',    [Validators.required]],
        // 'password'        : ['123',     [Validators.required]],
        // 'confirmPassword' : ['123',     [Validators.required]],
      });

      console.log("Usuario Actual: ",this.currentUser);
  };


  updateUser() : void{

    this.submittedForm = true;

    this.UserService.updateUser(this.updateForm.value).subscribe({
      next  : ( resp: any ) => {
        const { name, email } = this.updateForm.value;

        this.currentUser.name  = name;
        this.currentUser.email = email;

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario Actualizado Correctamente!",
          showConfirmButton: false,
          timer: 1500
        });

        // En js todos los objetos son pasados por referencia, por lo que al cambiar este objecto, el objeto padre tambien es modificado de forma indirecta
      },
      error : (err: any) => {

        const errors = [];

        for (const error in err.error.errors) {
          errors.push(err.error.errors[error].msg);
        };

        Swal.fire({
          position: "top-end",
          icon: 'error',
          title: errors,
          showConfirmButton: false,
          timer: 1500
        });
      },
    });
  };

  changeImage (event : any): void | null{
    const image = event.target.files[0];
    this.uploadedImage = image;

    if(!image) {
      return this.temporaryImage = null;
    };

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = () => {
      console.log(reader.result);

      this.temporaryImage = reader.result;
    };

  };

  uploadIMage(){
    this.fileUploadService.uploadFile(this.uploadedImage, 'users', this.currentUser.uid!).then(
      (image: string) => {
        this.currentUser.image = image;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario Actualizado Correctamente!",
          showConfirmButton: false,
          timer: 1500
        })
      }
    ).catch( (err) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Ocurrió un error, intente de nuevo!",
        showConfirmButton: false,
        timer: 1500
      })
    });
  };

  formControlValid(field : string) : boolean{
    return this.updateForm.get(field)?.invalid && this.submittedForm || false;
  };

}
