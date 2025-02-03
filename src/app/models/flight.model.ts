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
}

export interface Passenger {
  name: string;
  passportNumber: string;
}
