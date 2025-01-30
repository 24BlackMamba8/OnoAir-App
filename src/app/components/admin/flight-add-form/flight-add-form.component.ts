// flight-add-form.component.ts

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight-add-form',
  templateUrl: './flight-add-form.component.html',
  styleUrls: ['./flight-add-form.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class FlightAddFormComponent {
  newFlight: Flight = {
    id: 0, // This will be assigned in flight-management
    flightNumber: '',
    origin: '',
    destination: '',
    departure: new Date(),
    arrival: new Date(),
    image: '',
    seats: 0,
  };

  constructor(public dialogRef: MatDialogRef<FlightAddFormComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.newFlight);
  }
}

