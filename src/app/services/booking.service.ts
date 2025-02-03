import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Passenger {
  name: string;
  passportNumber: string;
}

export interface Booking {
  id: number;
  bookingCode: string;
  flightNumber: string;
  passengerCount: number;
  passengers: Passenger[];
  flight: string;
  date: string;
  status: string;
}



@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'https://example.com/api/bookings'; // Replace with your backend API

  constructor(private http: HttpClient) {}

  /**
   * Get all bookings.
   * @returns Observable of bookings array
   */
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  /**
   * Create a new booking.
   * @param booking The booking to be created
   * @returns Observable of the created booking
   */
  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  /**
   * Get a specific booking by its code.
   * @param bookingCode The booking code to retrieve
   * @returns Observable of the booking
   */
  getBooking(bookingCode: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${bookingCode}`);
  }

  /**
   * Update an existing booking.
   * @param bookingCode The booking code to update
   * @param booking The updated booking data
   * @returns Observable of the updated booking
   */
  updateBooking(bookingCode: string, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${bookingCode}`, booking);
  }

  /**
   * Delete a booking.
   * @param bookingCode The booking code to delete
   * @returns Observable of the deletion result
   */
  deleteBooking(bookingCode: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookingCode}`);
  }
}

