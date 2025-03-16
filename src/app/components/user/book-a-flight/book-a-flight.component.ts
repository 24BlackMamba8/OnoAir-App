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
  public flights: Flight[] =[];
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
