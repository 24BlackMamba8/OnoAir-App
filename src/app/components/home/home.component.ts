
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
      seats: 100,
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
    {
      id: 4,
      flightNumber: 'LN126',
      origin: 'Madrid',
      destination: 'Barcelona',
      departure: new Date('2025-03-02T07:00:00'),
      arrival: new Date('2025-03-02T08:15:00'),
      image: '/assets/images/barcelona.jpg',
      seats: 120,
    },
    {
      id: 5,
      flightNumber: 'LN127',
      origin: 'New York',
      destination: 'Chicago',
      departure: new Date('2025-03-03T09:30:00'),
      arrival: new Date('2025-03-03T11:30:00'),
      image: '/assets/images/chicago.jpg',
      seats: 110,
    },
    {
      id: 6,
      flightNumber: 'LN128',
      origin: 'Tokyo',
      destination: 'Osaka',
      departure: new Date('2025-03-04T12:00:00'),
      arrival: new Date('2025-03-04T13:30:00'),
      image: '/assets/images/osaka.jpg',
      seats: 95,
    },
    {
      id: 7,
      flightNumber: 'LN129',
      origin: 'Los Angeles',
      destination: 'San Francisco',
      departure: new Date('2025-03-05T15:00:00'),
      arrival: new Date('2025-03-05T16:15:00'),
      image: '/assets/images/san-francisco.jpg',
      seats: 85,
    },
    {
      id: 8,
      flightNumber: 'LN130',
      origin: 'Sydney',
      destination: 'Melbourne',
      departure: new Date('2025-03-06T17:30:00'),
      arrival: new Date('2025-03-06T18:45:00'),
      image: '/assets/images/melbourne.jpg',
      seats: 130,
    },
    {
      id: 9,
      flightNumber: 'LN131',
      origin: 'Dubai',
      destination: 'Doha',
      departure: new Date('2025-03-07T19:00:00'),
      arrival: new Date('2025-03-07T20:30:00'),
      image: '/assets/images/doha.jpg',
      seats: 75,
    },
    {
      id: 10,
      flightNumber: 'LN132',
      origin: 'Bangkok',
      destination: 'Phuket',
      departure: new Date('2025-03-08T21:00:00'),
      arrival: new Date('2025-03-08T22:15:00'),
      image: '/assets/images/phuket.jpg',
      seats: 140,
    },
    {
      id: 11,
      flightNumber: 'LN133',
      origin: 'Amsterdam',
      destination: 'Brussels',
      departure: new Date('2025-03-09T07:45:00'),
      arrival: new Date('2025-03-09T08:45:00'),
      image: '/assets/images/brussels.jpg',
      seats: 90,
    },
    {
      id: 12,
      flightNumber: 'LN134',
      origin: 'Vienna',
      destination: 'Zurich',
      departure: new Date('2025-03-10T12:15:00'),
      arrival: new Date('2025-03-10T13:30:00'),
      image: '/assets/images/zurich.jpg',
      seats: 100,
    },
  ];

      futureFlights: Flight[] = [
        {
          id: 1,
          flightNumber: 'FF101',
          origin: 'Toronto',
          destination: 'Vancouver',
          departure: new Date('2025-04-05T10:00:00'),
          arrival: new Date('2025-04-05T13:00:00'),
          image: '/assets/images/vancouver.jpg',
          seats: 150,
        },
        {
          id: 2,
          flightNumber: 'FF102',
          origin: 'Seoul',
          destination: 'Bangkok',
          departure: new Date('2025-04-10T09:30:00'),
          arrival: new Date('2025-04-10T13:00:00'),
          image: '/assets/images/bangkok.jpg',
          seats: 120,
        },
        {
          id: 3,
          flightNumber: 'FF103',
          origin: 'Mexico City',
          destination: 'Cancun',
          departure: new Date('2025-04-15T08:00:00'),
          arrival: new Date('2025-04-15T10:30:00'),
          image: '/assets/images/cancun.jpg',
          seats: 180,
        },
        {
          id: 4,
          flightNumber: 'FF104',
          origin: 'Frankfurt',
          destination: 'Athens',
          departure: new Date('2025-04-18T07:45:00'),
          arrival: new Date('2025-04-18T11:30:00'),
          image: '/assets/images/athens.jpg',
          seats: 200,
        },
        {
          id: 5,
          flightNumber: 'FF105',
          origin: 'Moscow',
          destination: 'Istanbul',
          departure: new Date('2025-04-20T06:00:00'),
          arrival: new Date('2025-04-20T09:00:00'),
          image: '/assets/images/istanbul.jpg',
          seats: 110,
        },
        {
          id: 6,
          flightNumber: 'FF106',
          origin: 'Beijing',
          destination: 'Shanghai',
          departure: new Date('2025-04-22T14:00:00'),
          arrival: new Date('2025-04-22T16:30:00'),
          image: '/assets/images/shanghai.jpg',
          seats: 95,
        },
        {
          id: 7,
          flightNumber: 'FF107',
          origin: 'Miami',
          destination: 'Las Vegas',
          departure: new Date('2025-04-25T16:00:00'),
          arrival: new Date('2025-04-25T19:30:00'),
          image: '/assets/images/las-vegas.jpg',
          seats: 130,
        },
        {
          id: 8,
          flightNumber: 'FF108',
          origin: 'Rome',
          destination: 'Madrid',
          departure: new Date('2025-04-28T09:00:00'),
          arrival: new Date('2025-04-28T11:30:00'),
          image: '/assets/images/madrid.jpg',
          seats: 160,
        },
        {
          id: 9,
          flightNumber: 'FF109',
          origin: 'London',
          destination: 'New York',
          departure: new Date('2025-05-01T10:00:00'),
          arrival: new Date('2025-05-01T14:00:00'),
          image: '/assets/images/new-york.jpg',
          seats: 175,
        },
        {
          id: 10,
          flightNumber: 'FF110',
          origin: 'Sydney',
          destination: 'Tokyo',
          departure: new Date('2025-05-05T12:00:00'),
          arrival: new Date('2025-05-05T20:00:00'),
          image: '/assets/images/tokyo.jpg',
          seats: 155,
        },
        {
          id: 11,
          flightNumber: 'FF111',
          origin: 'Cape Town',
          destination: 'Johannesburg',
          departure: new Date('2025-05-08T15:00:00'),
          arrival: new Date('2025-05-08T17:00:00'),
          image: '/assets/images/johannesburg.jpg',
          seats: 125,
        },
        {
          id: 12,
          flightNumber: 'FF112',
          origin: 'Hong Kong',
          destination: 'Singapore',
          departure: new Date('2025-05-10T18:00:00'),
          arrival: new Date('2025-05-10T21:00:00'),
          image: '/assets/images/singapore.jpg',
          seats: 135,
        },
      ];

  showLastMinuteFlights = false; // Control visibility of last minute flights
  showFutureFlights = false; // Control visibility of future flights

  constructor(private router: Router,public dialog: MatDialog,private flightService: FlightService, private orderService: OrderService) {}


  navigateToFutureFlights() {
    // You can use Angular's router to navigate to the future flights page
    this.router.navigate(['/future-flights']);
  }


  // Toggle visibility for Last Minute Flights section
  toggleLastMinuteFlights() {
    this.showLastMinuteFlights = !this.showLastMinuteFlights;
  }

  // Toggle visibility for Future Flights section
  toggleFutureFlights() {
    this.showFutureFlights = !this.showFutureFlights;
  }

  // Open booking dialog for future flights (example)
  openBookingDialog(flight: any) {
    // Implement your booking logic here
    console.log("Booking flight", flight);
  }

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
