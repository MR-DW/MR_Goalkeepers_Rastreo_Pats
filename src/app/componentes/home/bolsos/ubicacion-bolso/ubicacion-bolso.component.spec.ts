import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionBolsoComponent } from './ubicacion-bolso.component';

describe('UbicacionBolsoComponent', () => {
  let component: UbicacionBolsoComponent;
  let fixture: ComponentFixture<UbicacionBolsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionBolsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicacionBolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
