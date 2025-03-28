import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flight } from 'src/app/models/flight.model';
import { Passenger } from 'src/app/models/passenger.module';
import { Order } from 'src/app/models/order.model';
import { FlightService } from 'src/app/services/flight.service';
import { OrderService } from 'src/app/services/orders.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingDialogComponent } from 'src/app/components/user/booking-dialog/booking-dialog.component';
import { EditFlightComponent } from 'src/app/components/user/edit-flight/edit-flight.component';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-book-a-flight',
  templateUrl: './book-a-flight.component.html',
  styleUrls: ['./book-a-flight.component.css'],
  standalone: true,
  imports: [CommonModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatDialogModule,
            FormsModule],

})

export class BookAFlightComponent implements OnInit {
  public flights: Flight[] = [
    { id: 1, flightNumber: 'W61283', origin: 'Tel Aviv', destination: 'London', departure: new Date('2024-03-10T10:00:00'), arrival: new Date('2024-03-10T12:30:00'), seats: 150, image: 'assets/images/london.webp' },
    { id: 2, flightNumber: 'LX8396', origin: 'Tel Aviv', destination: 'Paris', departure: new Date('2024-03-15T14:00:00'), arrival: new Date('2024-03-15T17:45:00'), seats: 200, image: 'assets/images/paris.jpg' },
    { id: 3, flightNumber: 'BA247',  origin: 'London',  destination: 'New York', departure: new Date('2024-03-20T08:30:00'), arrival: new Date('2024-03-20T11:15:00'), seats: 100, image: 'assets/images/new york.jpg' },
    { id: 4, flightNumber: 'AF1337', origin: 'Paris',   destination: 'Dubai', departure: new Date('2024-03-25T12:00:00'), arrival: new Date('2024-03-25T16:30:00'), seats: 250, image: 'assets/images/dubai.jpeg' },
    { id: 5, flightNumber: 'EK987',  origin: 'Dubai',   destination: 'Sydney',    departure: new Date('2024-04-01T09:00:00'), arrival: new Date('2024-04-02T06:30:00'), seats: 300, image: 'assets/images/sydney.jpg' },
    { id: 6, flightNumber: 'LH456',  origin: 'Frankfurt', destination: 'Tokyo',    departure: new Date('2024-04-05T11:00:00'), arrival: new Date('2024-04-06T07:45:00'), seats: 180, image: 'assets/images/tokyo.jpg' },
    { id: 7, flightNumber: 'DL1234', origin: 'Tel Aviv', destination: 'Munich', departure: new Date('2024-04-10T16:30:00'), arrival: new Date('2024-04-11T08:15:00'), seats: 120, image: 'assets/images/munich.jpg' },
    { id: 8, flightNumber: 'UA888',  origin: 'New York', destination: 'Chicago', departure: new Date('2024-04-15T10:00:00'), arrival: new Date('2024-04-16T06:30:00'), seats: 220, image: 'assets/images/chicago.jpg' },
    { id: 9, flightNumber: 'SQ321',  origin: 'Tel Aviv', destination: 'Singapore', departure: new Date('2024-04-20T15:45:00'), arrival: new Date('2024-04-21T18:00:00'), seats: 280, image: 'assets/images/singapore.jpg' },
    { id: 10, flightNumber: 'AY567', origin: 'Helsinki', destination: 'Hong Kong',   departure: new Date('2024-04-25T08:00:00'), arrival: new Date('2024-04-26T17:30:00'), seats: 160, image: 'assets/images/hong-kong.webp' },
    { id: 11, flightNumber: 'QF101', origin: 'Sydney', destination: 'Los Angeles', departure: new Date('2024-05-01T07:00:00'), arrival: new Date('2024-05-01T20:30:00'), seats: 290, image: 'assets/images/los-angeles.jpg' },
    { id: 12, flightNumber: 'TK987', origin: 'Istanbul', destination: 'Berlin', departure: new Date('2024-05-05T12:45:00'), arrival: new Date('2024-05-05T16:20:00'), seats: 175, image: 'assets/images/berlin.jpg' },
    { id: 13, flightNumber: 'AC345', origin: 'Toronto', destination: 'Vancouver', departure: new Date('2024-05-10T14:00:00'), arrival: new Date('2024-05-10T17:15:00'), seats: 190, image: 'assets/images/vancouver.jpg' },
    { id: 14, flightNumber: 'JL567', origin: 'Tokyo', destination: 'Bangkok', departure: new Date('2024-05-15T09:30:00'), arrival: new Date('2024-05-15T14:00:00'), seats: 230, image: 'assets/images/bangkok.jpg' },
    { id: 15, flightNumber: 'NZ345', origin: 'Auckland', destination: 'Fiji', departure: new Date('2024-05-20T11:00:00'), arrival: new Date('2024-05-20T14:30:00'), seats: 160, image: 'assets/images/fiji.jpg' },
    { id: 16, flightNumber: 'BA432', origin: 'London', destination: 'Rome', departure: new Date('2024-05-25T08:15:00'), arrival: new Date('2024-05-25T11:30:00'), seats: 220, image: 'assets/images/rome.jpg' },
    { id: 17, flightNumber: 'AF789', origin: 'Paris', destination: 'Moscow', departure: new Date('2024-05-30T13:00:00'), arrival: new Date('2024-05-30T18:45:00'), seats: 180, image: 'assets/images/moscow.jpg' },
    { id: 18, flightNumber: 'LH999', origin: 'Frankfurt', destination: 'Vienna', departure: new Date('2024-06-04T10:30:00'), arrival: new Date('2024-06-04T12:15:00'), seats: 150, image: 'assets/images/vienna.jpg' },
    { id: 19, flightNumber: 'EK550', origin: 'Dubai', destination: 'Johannesburg', departure: new Date('2024-06-10T21:00:00'), arrival: new Date('2024-06-11T05:30:00'), seats: 300, image: 'assets/images/johannesburg.jpg' },
    { id: 20, flightNumber: 'CX888', origin: 'Hong Kong', destination: 'Seoul', departure: new Date('2024-06-15T16:45:00'), arrival: new Date('2024-06-15T21:10:00'), seats: 200, image: 'assets/images/seoul.jpg' }
  ];

  selectedFlight: Flight | null = null;
  passengers: Passenger[] = [];
  passengerCount: number = 0;
  step: 'edit' | 'seat' | null = null;
  updatedFlight: any = {}; // Store edited flight data
  selectedSeat: { row: number; seat: string } | null = null;


  constructor(
    private flightService: FlightService,
    private orderService: OrderService,
    private dialog: MatDialog // Inject MatDialog service
  ) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe((flights: Flight[]) => {
      console.log('Fetched Flights:', flights); // ✅ Debugging
      this.flights = flights;

      // Ensure each flight has a seatsLayout
      this.flights.forEach(flight => {
        if (!flight.seatsLayout) {
          flight.seatsLayout = Array.from({ length: 5 }, (_, row) => ({
            row: row + 1,
            seats: Array.from({ length: 6 }, (_, seatIndex) => ({
              row: row + 1,  // ✅ Add row to each seat
              seat: String.fromCharCode(65 + seatIndex) + (row + 1), // Example: A1, B1, C1
              occupied: Math.random() > 0.7
            }))


          }));
        }
      });
    });
  }


   // Select flight to book and show reservation form below the table
   selectFlight(flight: Flight): void {
    this.selectedFlight = flight; // הגדרת הטיסה שנבחרה
    this.passengerCount = 0;
    this.passengers = []; // אפס את פרטי הנוסעים
    this.updatedFlight = { ...flight };
    this.step = 'edit'; // Show the edit flight form first
  }


  openBookingDialog(flight: Flight): void {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      data: { flight }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Booking confirmed', result);
      }
    });
  }

  createReservation(flight: Flight): void {
    if (this.passengers.length === 0) {
      alert('Please add at least one passenger.');
      return;
    }

      // ✅ המרה של `name` ל- `firstName` ו- `lastName`
  const formattedPassengers = this.passengers.map(passenger => {
    const [firstName, ...lastNameParts] = passenger.firstName + ' ' + passenger.lastName.split(' ');
    return {
      firstName,
      lastName: lastNameParts.join(' ') || 'N/A', // אם אין שם משפחה, מניחים "N/A"
      passportNumber: passenger.passportNumber
    };
  });

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000).toString(),
      bookingCode: 'LM' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      flightNumber: flight.flightNumber,
      passengerCount: this.passengerCount,
      passengers: formattedPassengers,
      status: 'pending',
      date: new Date(), // ✅ שמירה כ- `Date`
      flight: flight,
    };

    // שמירה בהזמנות
    this.orderService.addOrder(newOrder);
    alert('Reservation created successfully!');
    this.passengers = [];
    this.passengerCount = 0;
    this.selectedFlight = null; // איפוס הבחירה
  }


    // Open the booking dialog when the user clicks "Book"
    openEditDialog(flight: Flight) {
      const dialogRef = this.dialog.open(EditFlightComponent, {
        width: '400px',
        data: flight
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const index = this.flights.findIndex(f => f.id === result.id);
          if (index !== -1) {
            this.flights[index] = result; // עדכון טיסה ברשימה
          }
        }
      });
    }

    onSave(): void {
      this.step = 'seat'; // Move to seat selection after saving
    }


    selectSeat(seat: { row: number; seat: string; occupied: boolean }) {
      if (!seat.occupied) {
        this.selectedSeat = seat;
      }
    }



    closeBooking(): void {
      this.selectedFlight = null;
      this.selectedSeat = null;
      this.passengers = [];
      this.step = null;
    }

}
