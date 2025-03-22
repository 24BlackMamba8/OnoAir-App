// flight.service.ts
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';
@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'http://localhost:4200/user/my-orders';
  private passengers: { firstName: string; lastName: string }[] = [];
  private selectedSeats: string[] = []; // שמירת מושבים מקומית
  private flights: Flight[] = [
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

  private bookings: Order[] = [
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



  constructor(private http: HttpClient) { }

    // פונקציה לשליפת רשימת טיסות מהזיכרון המקומי
    getAllFlights(): Observable<Flight[]> {
      return of(this.flights); // מחזיר את מערך הטיסות כ-Observable
    }

    getFlightById(id: number): Observable<Flight | undefined> {
      const flight = this.flights.find(f => f.id === id);
      return of(flight);
    }


  getFlight(id: number): Observable<Flight> {
    return this.http.get<Flight>(`/api/flights/${id}`);
  }

  getBookings(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      map((orders: Order[]) =>
        orders.map((order: Order) => ({
          ...order,
          date: new Date(order.date) // ✅ המרת `string` ל- `Date`
        }))
      )
    );
  }


  bookFlight(flightId: number, userId: number): Observable<any> {
    const bookingData = { flightId, userId };
    return this.http.post(`${this.apiUrl}/book`, bookingData);
  }

  savePassengers(passengers: { firstName: string; lastName: string }[]): Observable<any> {
    console.log("Saving passengers:", passengers); // בדיקה לפני שמירה
    this.passengers = passengers;
    console.log("Passengers saved in service:", this.passengers); // בדיקה אחרי שמירה
    return this.http.post(`${this.apiUrl}/savePassengers`, { passengers });
  }


  getPassengers() {
    return this.passengers;
  }
  saveSeats(seats: string[]): Observable<any> {
    console.log("Saving seats:", seats);
    return this.http.post(`${this.apiUrl}/saveSeats`, { seats });
  }
  // פונקציה להחזרת המושבים השמורים
  getSeats(): string[] {
    return this.selectedSeats;
  }


}


