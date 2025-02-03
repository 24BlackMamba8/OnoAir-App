// flight.service.ts
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flights: Flight[] = [
    { id: 1, flightNumber: 'W61283', origin: 'Tel Aviv', destination: 'London', departure: new Date('2024-03-10T10:00:00'), arrival: new Date('2024-03-10T12:30:00'), seats: 150, image: 'src/assets/images/london.webp' },
    { id: 2, flightNumber: 'LX8396', origin: 'Tel Aviv', destination: 'Paris', departure: new Date('2024-03-15T14:00:00'), arrival: new Date('2024-03-15T17:45:00'), seats: 200, image: 'src/assets/images/paris.jpg' },
    { id: 3, flightNumber: 'BA247',  origin: 'London',  destination: 'New York', departure: new Date('2024-03-20T08:30:00'), arrival: new Date('2024-03-20T11:15:00'), seats: 100, image: 'src/assets/images/new york.jpg' },
    { id: 4, flightNumber: 'AF1337', origin: 'Paris',   destination: 'Dubai', departure: new Date('2024-03-25T12:00:00'), arrival: new Date('2024-03-25T16:30:00'), seats: 250, image: 'src/assets/images/dubai.jpeg' },
    { id: 5, flightNumber: 'EK987',  origin: 'Dubai',   destination: 'Sydney',    departure: new Date('2024-04-01T09:00:00'), arrival: new Date('2024-04-02T06:30:00'), seats: 300, image: 'src/assets/images/sydney.jpg' },
    { id: 6, flightNumber: 'LH456',  origin: 'Frankfurt', destination: 'Tokyo',    departure: new Date('2024-04-05T11:00:00'), arrival: new Date('2024-04-06T07:45:00'), seats: 180, image: 'src/assets/images/tokyo.jpg' },
    { id: 7, flightNumber: 'DL1234', origin: 'Tel Aviv', destination: 'munich', departure: new Date('2024-04-10T16:30:00'), arrival: new Date('2024-04-11T08:15:00'), seats: 120, image: 'src/assets/images/munich.jpg' },
    { id: 8, flightNumber: 'UA888',  origin: 'New York', destination: 'chicago', departure: new Date('2024-04-15T10:00:00'), arrival: new Date('2024-04-16T06:30:00'), seats: 220, image: 'src/assets/images/chicago.jpg' },
    { id: 9, flightNumber: 'SQ321',  origin: 'Tel Aviv', destination: 'Singapore', departure: new Date('2024-04-20T15:45:00'), arrival: new Date('2024-04-21T18:00:00'), seats: 280, image: 'src/assets/images/singapore.jpg' },
    { id: 10, flightNumber: 'AY567', origin: 'Helsinki', destination: 'hong-kong',   departure: new Date('2024-04-25T08:00:00'), arrival: new Date('2024-04-26T17:30:00'), seats: 160, image: 'src/assets/images/hong-kong.webp' }
  ];

  private apiUrl = 'https://api.example.com/flights';
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
}


