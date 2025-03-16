// flight.model.ts
export interface Flight {
  id: number;
  flightNumber: string;
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  seats: number;
  image: string;
  firstName?: string;  // שם פרטי
  lastName?: string;   // שם משפחה
  seatNumber?: string; // מספר מושב
  seatsLayout?: SeatRow[];
}

export interface Passenger {
  firstName: string;
  lastName: string;
  passportNumber: string;
  selectedSeat?: string;  // שדה אופציונלי למושב שנבחר
}

export interface SeatRow {
  row: number;
  seats: Seat[];
}

export interface Seat {
  row: number;
  seat: string;
  occupied: boolean;
}
