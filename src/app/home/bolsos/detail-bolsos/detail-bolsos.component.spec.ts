import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBolsosComponent } from './detail-bolsos.component';

describe('DetailBolsosComponent', () => {
  let component: DetailBolsosComponent;
  let fixture: ComponentFixture<DetailBolsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBolsosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBolsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
