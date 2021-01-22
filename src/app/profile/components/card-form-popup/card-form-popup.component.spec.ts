import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormPopupComponent } from './card-form-popup.component';

describe('CardFormPopupComponent', () => {
  let component: CardFormPopupComponent;
  let fixture: ComponentFixture<CardFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFormPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
