import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGraficComponent } from './custom-grafic.component';

describe('CustomGraficComponent', () => {
  let component: CustomGraficComponent;
  let fixture: ComponentFixture<CustomGraficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomGraficComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomGraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
