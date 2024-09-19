import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoElEquipamientoComponent } from './todo-el-equipamiento.component';

describe('TodoElEquipamientoComponent', () => {
  let component: TodoElEquipamientoComponent;
  let fixture: ComponentFixture<TodoElEquipamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoElEquipamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoElEquipamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
