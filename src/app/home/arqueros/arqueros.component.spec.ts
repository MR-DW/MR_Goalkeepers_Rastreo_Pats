import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquerosComponent } from './arqueros.component';

describe('ArquerosComponent', () => {
  let component: ArquerosComponent;
  let fixture: ComponentFixture<ArquerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArquerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArquerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
