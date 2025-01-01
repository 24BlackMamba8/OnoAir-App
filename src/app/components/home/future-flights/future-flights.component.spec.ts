import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureFlightsComponent } from './future-flights.component';

describe('FutureFlightsComponent', () => {
  let component: FutureFlightsComponent;
  let fixture: ComponentFixture<FutureFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureFlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
