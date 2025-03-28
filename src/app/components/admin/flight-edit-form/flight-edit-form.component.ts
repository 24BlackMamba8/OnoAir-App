// flight-edit-form.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight-edit-form',
  templateUrl: './flight-edit-form.component.html',
  styleUrls: ['./flight-edit-form.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class FlightEditFormComponent {
  constructor(
    public dialogRef: MatDialogRef<FlightEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { flight: Flight }
  ) {}

  onSubmit(): void {
    this.dialogRef.close(this.data.flight);
  }
}
