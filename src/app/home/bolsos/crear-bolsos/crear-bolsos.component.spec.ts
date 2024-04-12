import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBolsosComponent } from './crear-bolsos.component';

describe('CrearBolsosComponent', () => {
  let component: CrearBolsosComponent;
  let fixture: ComponentFixture<CrearBolsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearBolsosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearBolsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
