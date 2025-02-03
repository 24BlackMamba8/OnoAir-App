// reservation.service.ts
import { Injectable } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [
    // ... add at least 10 reservations with unique reservation codes
  ];

  constructor() { }

  getAllReservations(): Reservation[] { // LIST method
    return this.reservations;
  }

  getReservation(reservationCode: string): Reservation | undefined { // GET method
    return this.reservations.find(reservation => reservation.reservationCode === reservationCode);
  }
}
