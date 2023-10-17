import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnDestroy {

  intervalId : any;

  // Para desuscribirme de un Observable debo almacenar el valor del Observable en una propiedad
  public intervalSubs!: Subscription;

  constructor(){

    // this.returnObservable().pipe(
    //   retry(1)
    // ).
    // subscribe({
    //   next : (resp: any) => { console.log(resp) },
    //   error : (error: any) => { console.log(error) },
    //   complete : ()=> { console.warn("Trabajo Realizado") }
    // });

    this.intervalSubs = this.returnInterval().subscribe({
      next : (resp)=>{console.log(resp);},
      error : (error)=> {console.log(error)},
      complete : () => console.log("Proceso Terminado!")
    });

  }

  ngOnDestroy(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
    }

    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number>{
    return interval(300).pipe(
      map((arg)=> arg + 1),
      filter((arg)=> arg % 2 === 0 ),
      take(6), // Con este operador controlamos cuantas emisiones necesitamos del Observable

      // El Orden de estos operadors es importante :)
      )
  }

  returnObservable(): Observable<number>{
    let i = 0;
    return new Observable<number>((observer) =>{

      this.intervalId = setInterval( ()=>{
        i++;

        observer.next(i);

        if (i == 10) {
          clearInterval(this.intervalId);
        }

        if(i >= 11){
          observer.error("Se pasó del numero 10");
        }

        if(i == 10){
          observer.complete();
        }
      }, 1000);
    });

  }
}
