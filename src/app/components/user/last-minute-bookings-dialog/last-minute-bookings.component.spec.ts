import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMinuteBookingsComponent } from './last-minute-bookings.component';

describe('LastMinuteBookingsComponent', () => {
  let component: LastMinuteBookingsComponent;
  let fixture: ComponentFixture<LastMinuteBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastMinuteBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastMinuteBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
