import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearArqueroComponent } from './crear-arquero.component';

describe('CrearArqueroComponent', () => {
  let component: CrearArqueroComponent;
  let fixture: ComponentFixture<CrearArqueroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearArqueroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearArqueroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
