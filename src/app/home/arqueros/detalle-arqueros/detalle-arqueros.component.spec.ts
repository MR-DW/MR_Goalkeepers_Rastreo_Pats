import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleArquerosComponent } from './detalle-arqueros.component';

describe('DetalleArquerosComponent', () => {
  let component: DetalleArquerosComponent;
  let fixture: ComponentFixture<DetalleArquerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleArquerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleArquerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
