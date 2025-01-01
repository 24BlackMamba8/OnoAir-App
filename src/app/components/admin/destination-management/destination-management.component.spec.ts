import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationManagementComponent } from './destination-management.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DestinationManagementComponent', () => {
  let component: DestinationManagementComponent;
  let fixture: ComponentFixture<DestinationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,              // Import Angular Material Table Module for testing
        BrowserAnimationsModule      // Import Angular Browser Animations Module for smooth animation
      ],
      declarations: [DestinationManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display destinations', () => {
    // Check if the number of rows in the table matches the number of destinations
    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBe(component.destinations.length);
  });

  it('should display correct destination name in the table', () => {
    const compiled = fixture.nativeElement;
    const firstDestination = component.destinations[0];
    const nameCell = compiled.querySelector('mat-row mat-cell');
    expect(nameCell.textContent).toContain(firstDestination.name);
  });
});

