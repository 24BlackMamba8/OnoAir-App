// reservation.model.ts
export interface Reservation {
  reservationCode: string;
  flightId: number; // Changed to flightId to match Flight model
  passengers: { name: string, passportNumber: string }[];
}
