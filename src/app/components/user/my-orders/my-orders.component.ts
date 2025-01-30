import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // למקרה שאתה גם משתמש ב-ngModel
import { Observable } from 'rxjs'; // For reactive updates
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight.model';
import { FlightDetailsComponent } from 'src/app/components/admin/flight-details/flight-details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-my-orders',
  standalone: true,
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  imports:[CommonModule, FormsModule,MatDialogModule] // הוסף את CommonModule כאן
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  upcomingOrders: Order[] = [];
  previousOrders: Order[] = [];

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    console.log(this.orders); // בדוק אם ה-URL של התמונה קיים
  }

 // פונקציה זו טוענת את ההזמנות ומעדכנת את המערך

 loadOrders(): void {
  const allOrders: Order[] = [
    {
      id: '1',
      bookingCode: 'ABC123',
      flightNumber: 'ON001',
      passengerCount: 5,
      status: 'Confirmed',
      date: '2025-07-16',
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
        { name: 'Dany Avdia', passportNumber: '123456789' },
        { name: 'Liron Avdia', passportNumber: '987654321' },
      ]
    },
    {
      id: '2',
      bookingCode: 'XYZ456',
      flightNumber: 'ON002',
      passengerCount: 6,
      status: 'Pending',
      date: '2024-05-20',
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
        { name: 'Moran Cohen', passportNumber: '112233445' },
        { name: 'Mishel Levi', passportNumber: '556677889' },
      ]
    },
    {
      id: '3',
      bookingCode: 'AMST789',
      flightNumber: 'ON003',
      passengerCount: 3,
      status: 'Confirmed',
      date: '2025-08-10',
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
        { name: 'Noa Levi', passportNumber: '223344556' },
        { name: 'Eitan Bar', passportNumber: '667788990' },
      ]
    },
    {
      id: '4',
      bookingCode: 'CAN567',
      flightNumber: 'ON004',
      passengerCount: 2,
      status: 'Pending',
      date: '2024-06-15',
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
        { name: 'David Green', passportNumber: '998877665' },
        { name: 'Sarah Cohen', passportNumber: '554433221' },
      ]
    }
  ];

  const currentDate = new Date();

  this.upcomingOrders = allOrders.filter(order => new Date(order.flight.departure) > currentDate);
  this.previousOrders = allOrders.filter(order => new Date(order.flight.arrival) < currentDate);
}



// פונקציה לניהול הצגת פרטי ההזמנה
viewBooking(order: Order): void {
  // ניווט לדף פרטי ההזמנה
  this.router.navigate(['/booking-details', order.id]);
}

viewFlightDetails(order: Order): void {
  console.log('Order:', order);

  if (!order.flight) {
    console.error('No flight details found:', order);
    return;
  }

  const flight = order.flight;

  if (!flight.id || !flight.origin || !flight.destination || !flight.departure || !flight.arrival) {
    console.error('Incomplete flight details:', flight);
    return;
  }

  this.router.navigate(['/flight-details', flight.id]);
}


// פונקציה לרענן את הדף באופן ידני (כאשר תלחץ על כפתור)
refreshOrders(): void {
  this.loadOrders(); // טוען מחדש את ההזמנות
}
}

