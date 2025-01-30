export interface Passenger {
  name: string;
  passportNumber: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  flightNumber: string;
  passengerCount: number;
  passengers: Passenger[]; // Use the Passenger type here
  flight: string;
  date: string;
  status: string;
}
