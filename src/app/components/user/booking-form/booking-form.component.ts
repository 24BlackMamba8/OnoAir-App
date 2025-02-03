import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Booking Form</h2>
    <p><strong>Flight:</strong> {{ data.flight.flightNumber }}</p>
    <p><strong>Origin:</strong> {{ data.flight.originCode }}</p>
    <p><strong>Destination:</strong> {{ data.flight.destinationCode }}</p>
    <p><strong>Departure:</strong> {{ data.flight.departureDateTime | date: 'medium' }}</p>
    <p><strong>Seats Available:</strong> {{ data.flight.availableSeats }}</p>

    <form (ngSubmit)="submitBooking()">
      <div>
        <label for="passengerCount">Number of Seats:</label>
        <input
          type="number"
          id="passengerCount"
          [(ngModel)]="booking.passengerCount"
          name="passengerCount"
          min="1"
          [max]="data.flight.availableSeats"
          required
          (input)="adjustPassengerCount()"
        />
      </div>

      <div *ngFor="let passenger of booking.passengers; let i = index">
        <h4>Passenger {{ i + 1 }}</h4>
        <label for="name-{{ i }}">Name:</label>
        <input
          type="text"
          id="name-{{ i }}"
          [(ngModel)]="passenger.name"
          name="name-{{ i }}"
          required
        />
        <label for="passport-{{ i }}">Passport Number:</label>
        <input
          type="text"
          id="passport-{{ i }}"
          [(ngModel)]="passenger.passportNumber"
          name="passportNumber-{{ i }}"
          required
        />
      </div>

      <div>
        <label for="bookingCode">Booking Code:</label>
        <input
          type="text"
          id="bookingCode"
          [(ngModel)]="booking.bookingCode"
          name="bookingCode"
          required
        />
      </div>

      <button type="submit" mat-button [disabled]="!isFormValid()">Submit</button>
    </form>

    <button mat-button (click)="closeDialog()">Close</button>
  `,
  styles: [``],
})
export class BookingFormComponent implements OnInit {
  booking!: { // No initializer here
    bookingCode: string;
    flightNumber: string;
    passengerCount: number;
    passengers: { name: string; passportNumber: string }[];
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { flight: any },
    private dialogRef: MatDialogRef<BookingFormComponent>
  ) { }

  ngOnInit(): void {
    // Initialize the booking object in ngOnInit
    this.booking = {
      bookingCode: '',
      flightNumber: this.data.flight.flightNumber, // Now safe to access data
      passengerCount: 1,
      passengers: [{ name: '', passportNumber: '' }]
    };
  }


  adjustPassengerCount(): void {
    const passengerCount = this.booking.passengerCount;

    if (passengerCount > this.booking.passengers.length) {
      // Add passengers
      for (let i = this.booking.passengers.length; i < passengerCount; i++) {
        this.booking.passengers.push({ name: '', passportNumber: '' });
      }
    } else if (passengerCount < this.booking.passengers.length) {
      // Remove passengers
      this.booking.passengers.splice(passengerCount);
    }
  }

  isFormValid(): boolean {
    return (
      this.booking.bookingCode.trim() !== '' &&
      this.booking.passengerCount > 0 &&
      this.booking.passengers.every(
        (p) =>
          p.name.trim() !== '' && p.passportNumber.trim() !== ''
      )
    );
  }

  submitBooking(): void {
    console.log('Booking submitted:', this.booking);
    this.dialogRef.close(this.booking);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
