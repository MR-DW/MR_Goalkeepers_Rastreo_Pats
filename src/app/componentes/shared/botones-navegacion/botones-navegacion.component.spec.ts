import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesNavegacionComponent } from './botones-navegacion.component';

describe('BotonesNavegacionComponent', () => {
  let component: BotonesNavegacionComponent;
  let fixture: ComponentFixture<BotonesNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonesNavegacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonesNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
