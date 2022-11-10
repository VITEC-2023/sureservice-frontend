import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeworkComponent } from './employeework.component';

describe('EmployeeworkComponent', () => {
  let component: EmployeeworkComponent;
  let fixture: ComponentFixture<EmployeeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
