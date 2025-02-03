import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { Passenger } from 'src/app/models/passenger.module';
import { Order } from 'src/app/models/order.model';
import { FlightService } from 'src/app/services/flight.service';
import { OrderService } from 'src/app/services/orders.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingDialogComponent } from 'src/app/components/user/booking-dialog/booking-dialog.component';
import { EditFlightComponent } from 'src/app/components/user/edit-flight/edit-flight.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-a-flight',
  templateUrl: './book-a-flight.component.html',
  styleUrls: ['./book-a-flight.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],

})

export class BookAFlightComponent implements OnInit {
  public flights: Flight[] =[];
  selectedFlight: Flight | null = null;
  passengers: Passenger[] = [];
  passengerCount: number = 0;
  newPassenger: Passenger = { name: '', passportNumber: '' };


  constructor(
    private flightService: FlightService,
    private orderService: OrderService,
    private dialog: MatDialog // Inject MatDialog service
  ) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe((flights: Flight[]) => {
      console.log(flights); // הדפס את התשובה
      this.flights = flights;
    });
  }




   // Select flight to book and show reservation form below the table
   selectFlight(flight: Flight): void {
    this.selectedFlight = flight; // הגדרת הטיסה שנבחרה
    this.passengerCount = 0;
    this.passengers = []; // אפס את פרטי הנוסעים
  }


  addPassenger(): void {
    if (this.newPassenger.name && this.newPassenger.passportNumber) {
      this.passengers.push({ ...this.newPassenger });
      this.newPassenger = { name: '', passportNumber: '' };
      this.passengerCount = this.passengers.length;
    } else {
      alert('Please provide both name and passport number.');
    }
  }

  createReservation(flight: Flight): void {
    if (this.passengers.length === 0) {
      alert('Please add at least one passenger.');
      return;
    }

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000).toString(),
      bookingCode: 'LM' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      flightNumber: flight.flightNumber,
      passengerCount: this.passengerCount,
      passengers: this.passengers,
      status: 'pending',
      date: new Date().toISOString(),
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


}
