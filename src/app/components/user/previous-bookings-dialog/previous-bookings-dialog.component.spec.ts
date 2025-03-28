import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousBookingsDialogComponent } from './previous-bookings-dialog.component';

describe('PreviousBookingsDialogComponent', () => {
  let component: PreviousBookingsDialogComponent;
  let fixture: ComponentFixture<PreviousBookingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousBookingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousBookingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
