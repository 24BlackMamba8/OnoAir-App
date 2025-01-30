// last-minute-flights.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight.model'; // Import the Flight interface
import { MatDialog } from '@angular/material/dialog';
import { EditFlightComponent } from 'src/app/components/user/edit-flight/edit-flight.component';
import { OrderService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-last-minute-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-minute-flights.component.html',
  styleUrls: ['./last-minute-flights.component.css']
})
export class LastMinuteFlightsComponent {

// last-minute-flights.component.ts

flights: Flight[] = [
  {
    id: 1,
    flightNumber: 'AA101',
    origin: 'New York',
    destination: 'Los Angeles',
    departure: new Date('2024-05-10T09:00:00'),
    arrival: new Date('2024-05-10T12:00:00'),
    image: 'path/to/image.jpg',
    seats: 150, // Add seats property here
  },
  {
    id: 2,
    flightNumber: 'UA202',
    origin: 'Chicago',
    destination: 'San Francisco',
    departure: new Date('2024-05-15T10:30:00'),
    arrival: new Date('2024-05-15T13:30:00'),
    image: 'path/to/image.jpg',
    seats: 120, // Add seats property here
  },
  {
    id: 3,
    flightNumber: 'DL303',
    origin: 'Atlanta',
    destination: 'Denver',
    departure: new Date('2024-05-20T11:45:00'),
    arrival: new Date('2024-05-20T14:45:00'),
    image: 'path/to/image.jpg',
    seats: 180, // Add seats property here
  },
  {
    id: 4,
    flightNumber: 'AA101',
    origin: 'New York',
    destination: 'Los Angeles',
    departure: new Date('2024-05-10T09:00:00'),
    arrival: new Date('2024-05-10T12:00:00'),
    image: 'path/to/image.jpg',
    seats: 150,
  },
  {
    id: 5,
    flightNumber: 'UA202',
    origin: 'Chicago',
    destination: 'San Francisco',
    departure: new Date('2024-05-15T10:30:00'),
    arrival: new Date('2024-05-15T13:30:00'),
    image: 'path/to/image.jpg',
    seats: 120,
  },
  {
    id: 6,
    flightNumber: 'DL303',
    origin: 'Atlanta',
    destination: 'Denver',
    departure: new Date('2024-05-20T11:45:00'),
    arrival: new Date('2024-05-20T14:45:00'),
    image: 'path/to/image.jpg',
    seats: 180,
  },
  {
    id: 7,
    flightNumber: 'WN404',
    origin: 'Dallas',
    destination: 'Orlando',
    departure: new Date('2024-05-25T10:00:00'),
    arrival: new Date('2024-05-25T13:00:00'),
    image: 'path/to/image.jpg',
    seats: 200,
  }
  // ... more flights, make sure to add 'seats' to each one
];

constructor(private router: Router, public dialog: MatDialog,private orderService: OrderService) {}


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

createOrder(flight: Flight) {
  const newOrder: Order = {
    id: 'ORD-' + Math.floor(Math.random() * 1000000).toString(),
    bookingCode: `BC-${new Date().getTime()}`,
    flightNumber: flight.flightNumber,
    passengerCount: 1,
    status: 'Booked',
    passengers: [{ name: 'Israel Israeli', passportNumber: '123456789' }],
    date: new Date().toISOString(),
    flight: flight
  };

  this.orderService.createOrder(newOrder);  // Call the service to add the order
  alert(`Booking successful! Flight to ${flight.destination} saved.`);
}
}
