import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBolsosComponent } from './detalle-bolsos.component';

describe('DetalleBolsosComponent', () => {
  let component: DetalleBolsosComponent;
  let fixture: ComponentFixture<DetalleBolsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleBolsosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleBolsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
