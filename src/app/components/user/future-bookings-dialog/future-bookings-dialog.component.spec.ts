import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureBookingsDialogComponent } from './future-bookings-dialog.component';

describe('FutureBookingsDialogComponent', () => {
  let component: FutureBookingsDialogComponent;
  let fixture: ComponentFixture<FutureBookingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureBookingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureBookingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
