export interface Order {
  id: string;
  bookingCode: string;
  flightNumber: string;
  passengerCount: number;
  status: string;
  date: Date;
  flight: {
    id: number;
    flightNumber: string;
    origin: string;
    destination: string;
    departure: Date;
    arrival: Date;
    seats: number;
    image: string;
  };
  passengers: {
    firstName: string;
    lastName: string;
    passportNumber?: string; // ✅ שינוי ל- `passportNumber?`
    selectedSeat?: string;
  }[];
}

