import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaserComponent } from './increaser.component';

describe('IncreaserComponent', () => {
  let component: IncreaserComponent;
  let fixture: ComponentFixture<IncreaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncreaserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncreaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
