export interface Passenger {
  firstName: string;
  lastName: string;
  passportNumber: string;
  selectedSeat?: string;  // שדה אופציונלי למושב שנבחר
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
