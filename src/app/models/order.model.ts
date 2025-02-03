import { Flight } from './flight.model';

export interface Order {
  id: string;
  bookingCode: string;
  flightNumber: string;
  passengerCount: number;
  passengers: { name: string; passportNumber: string }[];
  status: string;
  date: string; // Add the date property here
  flight: Flight;
}


