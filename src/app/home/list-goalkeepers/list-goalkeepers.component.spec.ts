import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGoalkeepersComponent } from './list-goalkeepers.component';

describe('ListGoalkeepersComponent', () => {
  let component: ListGoalkeepersComponent;
  let fixture: ComponentFixture<ListGoalkeepersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGoalkeepersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGoalkeepersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
