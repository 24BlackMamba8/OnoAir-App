import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Booking } from 'src/app/services/booking.service'; // Adjust path if needed

@Component({
  selector: 'app-upcoming-bookings-dialog',
  templateUrl: './upcoming-bookings-dialog.component.html',
  styleUrls: ['./upcoming-bookings-dialog.component.css']
})
export class UpcomingBookingsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpcomingBookingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { booking: Booking }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
