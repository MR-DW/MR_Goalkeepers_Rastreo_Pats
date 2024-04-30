import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarArquerosComponent } from './editar-arqueros.component';

describe('EditarArquerosComponent', () => {
  let component: EditarArquerosComponent;
  let fixture: ComponentFixture<EditarArquerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarArquerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarArquerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
