// home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ייבוא ה-Router
import { OrderService } from 'src/app/services/orders.service'; // שירות ההזמנות
import { Flight } from 'src/app/models/flight.model'; // מודל הטיסה
import { FlightService } from 'src/app/services/flight.service';
import { Order } from 'src/app/models/order.model'; // מודל ההזמנה
import { MatDialog } from '@angular/material/dialog';
import { EditFlightComponent } from 'src/app/components/user/edit-flight/edit-flight.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  lastMinuteFlights: Flight[] = [
    {
      id: 1,
      flightNumber: 'LN123',
      origin: 'Berlin',
      destination: 'Munich',
      departure: new Date('2025-03-25T10:00:00'),
      arrival: new Date('2025-03-25T12:00:00'),
      image: '/assets/images/munich.jpg',
      seats: 100, // לפי המודל
    },
    {
      id: 2,
      flightNumber: 'LN124',
      origin: 'Dublin',
      destination: 'London',
      departure: new Date('2025-03-01T08:00:00'),
      arrival: new Date('2025-03-01T09:30:00'),
      image: '/assets/images/london.webp',
      seats: 80,
    },
    {
      id: 3,
      flightNumber: 'LN125',
      origin: 'Paris',
      destination: 'Rome',
      departure: new Date('2025-02-29T14:00:00'),
      arrival: new Date('2025-02-29T16:00:00'),
      image: '/assets/images/Colosseum-Rome.webp',
      seats: 50,
    },
  ];

  constructor(private router: Router,public dialog: MatDialog,private flightService: FlightService, private orderService: OrderService) {}

  ngOnInit(): void {}

  navigateToLastMinute(): void {
    this.router.navigate(['/last-minute-flights']); // ניווט לטיסות של הרגע האחרון
  }

  exploreFlights(): void {
    this.router.navigate(['/flights']); // ניווט לעמוד כל הטיסות
  }

openEditDialog(flight: Flight) {
  const dialogRef = this.dialog.open(EditFlightComponent, {
    width: '400px',
    data: flight
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const index = this.lastMinuteFlights.findIndex(f => f.id === result.id); // שינוי מ-flights ל-lastMinuteFlights
      if (index !== -1) {
        this.lastMinuteFlights[index] = result; // עדכון הטיסה ברשימה
      }
    }
  });
}


  bookFlight(flight: Flight): void {
    const newOrder: Order = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000).toString(), // Generate an id for the order
      bookingCode: 'LM' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      flightNumber: flight.flightNumber,
      passengerCount: 1,
      passengers: [{ name: 'John Doe', passportNumber: '12345678' }],
      status: 'Booked',
      date: new Date().toISOString(), // Add the current date
      flight: flight, // Include the flight details
    };

    this.orderService.addOrder(newOrder); // Call the service to add the order
    alert(`Booking successful! Flight to ${flight.destination} saved.`);
  }


}

