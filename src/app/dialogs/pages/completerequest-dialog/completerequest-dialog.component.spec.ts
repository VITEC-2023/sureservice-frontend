import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleterequestDialogComponent } from './completerequest-dialog.component';

describe('CompleterequestDialogComponent', () => {
  let component: CompleterequestDialogComponent;
  let fixture: ComponentFixture<CompleterequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleterequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleterequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
