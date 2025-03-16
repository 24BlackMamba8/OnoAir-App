import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { OrderService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // למקרה שאתה גם משתמש ב-ngModel
import { Observable } from 'rxjs'; // For reactive updates
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight.model';
import { FlightDetailsComponent } from 'src/app/components/admin/flight-details/flight-details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';
import { FlightService } from 'src/app/services/flight.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  imports:[CommonModule, FormsModule,MatDialogModule], // הוסף את CommonModule כאן
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  today = new Date();
  bookings: Order[] = [
    {
      id: '1',
      bookingCode: 'ABC123',
      flightNumber: 'ON001',
      passengerCount: 2,
      status: 'Confirmed',
      date: new Date('2025-07-16'), // ✅ עכשיו זה Date במקום string
      flight: {
        id: 1,
        flightNumber: 'ON001',
        origin: 'Tel Aviv',
        destination: 'Paris',
        departure: new Date('2025-07-16T20:00:00'),
        arrival: new Date('2025-07-17T01:00:00'),
        seats: 150,
        image: 'assets/images/paris.jpg',
      },
      passengers: [
        { firstName: 'Dany', lastName: 'Avdia', passportNumber: '123456789' },
        { firstName: 'Liron', lastName: 'Avdia', passportNumber: '987654321' }
      ]
    },
    {
      id: '2',
      bookingCode: 'XYZ456',
      flightNumber: 'ON002',
      passengerCount: 6,
      status: 'Pending',
      date: new Date('2024-05-20') ,
      flight: {
        id: 2,
        flightNumber: 'ON002',
        origin: 'Tel Aviv',
        destination: 'New York',
        departure: new Date('2024-05-20T20:00:00'),
        arrival: new Date('2024-05-21T02:00:00'),
        seats: 150,
        image: 'assets/images/new york.jpg',
      },
      passengers: [
        { firstName: 'Moran', lastName: 'Cohen', passportNumber: '112233445' },
        { firstName: 'Mishel', lastName: 'Levi', passportNumber: '556677889' }
      ]
    },
    {
      id: '3',
      bookingCode: 'AMST789',
      flightNumber: 'ON003',
      passengerCount: 3,
      status: 'Confirmed',
      date: new Date ('2025-08-10'),
      flight: {
        id: 3,
        flightNumber: 'ON003',
        origin: 'Tel Aviv',
        destination: 'Amsterdam',
        departure: new Date('2025-08-10T15:30:00'),
        arrival: new Date('2025-08-10T19:00:00'),
        seats: 180,
        image: 'assets/images/amsterdam.jpg',
      },
      passengers: [
        { firstName: 'Noa', lastName: 'Levi', passportNumber: '223344556' },
        { firstName: 'Eitan', lastName: 'Bar', passportNumber: '667788990' }
      ]
    },
    {
      id: '4',
      bookingCode: 'CAN567',
      flightNumber: 'ON004',
      passengerCount: 2,
      status: 'Pending',
      date: new Date ('2024-06-15'),
      flight: {
        id: 4,
        flightNumber: 'ON004',
        origin: 'Tel Aviv',
        destination: 'Toronto',
        departure: new Date('2024-06-15T08:00:00'),
        arrival: new Date('2024-06-15T18:00:00'),
        seats: 200,
        image: 'assets/images/toronto.jpg',
      },
      passengers: [
        { firstName: 'David', lastName: 'Green', passportNumber: '998877665' },
        { firstName: 'Sarah', lastName: 'Cohen', passportNumber: '554433221' }
      ]
    }
  ];

  constructor(
    private orderService: OrderService,
    private flightService: FlightService,
    public dialog: MatDialog,
    private router: Router
  ) {}

ngOnInit(): void {
  console.log('MyOrdersComponent initialized');
  this.loadOrders(); // טוען את ההזמנות מ-localStorage
}

loadOrders(): void {
  const storedOrders = localStorage.getItem('myOrders');
  if (storedOrders) {
    this.bookings = JSON.parse(storedOrders);
  } else {
    console.log('No orders found in localStorage.');
  }
}


get upcomingOrders() {
  return this.bookings.filter(order => order.date >= this.today);
}

get previousOrders() {
  return this.bookings.filter(order => order.date < this.today);
}
viewFlightDetails(order: Order) {
  const dialogRef = this.dialog.open(FlightDetailsComponent, {
    width: '600px',
    data: { flight: order.flight }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Flight details dialog closed', result);
  });
}

refreshOrders() {
  console.log('Refreshing orders...');
}

}

