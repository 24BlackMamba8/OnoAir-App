import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingBookingsDialogComponent } from './upcoming-bookings-dialog.component';

describe('UpcomingBookingsDialogComponent', () => {
  let component: UpcomingBookingsDialogComponent;
  let fixture: ComponentFixture<UpcomingBookingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingBookingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingBookingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
