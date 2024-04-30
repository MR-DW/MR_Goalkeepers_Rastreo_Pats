import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReglamentoComponent } from './editar-reglamento.component';

describe('EditarReglamentoComponent', () => {
  let component: EditarReglamentoComponent;
  let fixture: ComponentFixture<EditarReglamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarReglamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarReglamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
