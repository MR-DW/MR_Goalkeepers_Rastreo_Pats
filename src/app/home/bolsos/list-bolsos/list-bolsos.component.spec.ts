import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBolsosComponent } from './list-bolsos.component';

describe('ListBolsosComponent', () => {
  let component: ListBolsosComponent;
  let fixture: ComponentFixture<ListBolsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBolsosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBolsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
