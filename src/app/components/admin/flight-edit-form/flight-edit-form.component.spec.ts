import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightEditFormComponent } from './flight-edit-form.component';

describe('FlightEditFormComponent', () => {
  let component: FlightEditFormComponent;
  let fixture: ComponentFixture<FlightEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
