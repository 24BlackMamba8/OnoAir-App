import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Passenger } from 'src/app/models/passenger.module';
import { Order } from 'src/app/models/order.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Flight } from 'src/app/models/flight.model';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css'],
  imports: [CommonModule,FormsModule, MatDialogModule]
})
export class BookingDialogComponent {
  passengers: Passenger[] = [];
  newPassenger: Passenger = { name: '', passportNumber: '' };
  passengerCount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // מקבל את פרטי הטיסה שנבחרה
  ) {}

  addPassenger(): void {
    if (this.newPassenger.name && this.newPassenger.passportNumber) {
      this.passengers.push({ ...this.newPassenger });
      this.newPassenger = { name: '', passportNumber: '' }; // ריקון טופס אחרי הוספה
    } else {
      alert('Please provide both name and passport number.');
    }
  }

  createReservation(): void {
    const booking: Order = {
      id: this.generateBookingId(),
      bookingCode: this.generateBookingCode(),
      flightNumber: this.data.flight.flightNumber,
      passengerCount: this.passengerCount,
      passengers: this.passengers,
      flight: this.data.flight.destination,
      date: new Date().toISOString(),
      status: 'Booked',
    };
    this.dialogRef.close(booking); // מחזיר את ההזמנה אחרי סגירת המודל
  }

  generateBookingId(): string {
    return 'ORD' + Math.floor(Math.random() * 1000000).toString();
  }

  generateBookingCode(): string {
    return 'BK' + Math.floor(Math.random() * 1000000).toString();
  }
}
