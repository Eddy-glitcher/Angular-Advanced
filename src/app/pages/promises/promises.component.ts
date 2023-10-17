import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.scss']
})
export class PromisesComponent implements OnInit {


  ngOnInit(): void {
  //   const promise = new Promise((resolve, reject)=>{

  //     if (false) {
  //       resolve('Hola Mundo');
  //     }else{
  //       reject('Algo salió mal en la promesa');
  //     }

  //   });

  //   promise.then(()=>{
  //     console.log("He Terminado Promise");
  //   }).catch((error)=>{
  //     console.log(error);
  //   });

    this.getUsers().then( (users) =>{
      console.log(users);
    })
  }

  getUsers(){
    return new Promise((resolve, reject) =>{
      fetch('https://reqres.in/api/users')
        .then( (resp) =>
          resp.json()
        .then((body) =>{ resolve(body.data);})
        .catch((error)=>{ reject("Hay un Error: "+error); })
      );
    });
  }



}
