import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBolsoComponent } from './editar-bolso.component';

describe('EditarBolsoComponent', () => {
  let component: EditarBolsoComponent;
  let fixture: ComponentFixture<EditarBolsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarBolsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
