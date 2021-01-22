import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContainerCardComponent } from './grid-container-card.component';

describe('GridContainerCardComponent', () => {
  let component: GridContainerCardComponent;
  let fixture: ComponentFixture<GridContainerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridContainerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridContainerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
