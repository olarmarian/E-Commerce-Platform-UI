import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationActionsComponent } from './pagination-actions.component';

describe('PaginationActionsComponent', () => {
  let component: PaginationActionsComponent;
  let fixture: ComponentFixture<PaginationActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
