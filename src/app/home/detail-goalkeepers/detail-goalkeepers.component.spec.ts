import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGoalkeepersComponent } from './detail-goalkeepers.component';

describe('DetailGoalkeepersComponent', () => {
  let component: DetailGoalkeepersComponent;
  let fixture: ComponentFixture<DetailGoalkeepersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGoalkeepersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailGoalkeepersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
