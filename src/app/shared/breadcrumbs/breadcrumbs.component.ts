import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map, pipe } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnDestroy {

  title : string = '';
  public titleSubs!: Subscription;

  constructor(private router : Router){
    this.titleSubs = this.getPageTitle().subscribe(({title}) => {
      this.title = title;
      document.title = `${document.title} - ${title}`
    });
  }

  ngOnDestroy(): void {
    this.titleSubs.unsubscribe();
  }

  getPageTitle(){
    return this.router.events
      .pipe(
        filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event : ActivationEnd) => event.snapshot.data)
      )
  }
}
