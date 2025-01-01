import { Component, OnInit } from '@angular/core';

export interface Flight {
  flightNumber: string;
  destinationCode: string;
  departureDate: Date;
}

@Component({
  selector: 'app-last-minute-flights',
  templateUrl: './last-minute-flights.component.html',
  styleUrls: ['./last-minute-flights.component.scss']
})
export class LastMinuteFlightsComponent implements OnInit {
  lastMinuteFlights: Flight[] = [
    { flightNumber: 'OA101', destinationCode: 'JFK', departureDate: new Date() },
    { flightNumber: 'OA202', destinationCode: 'LAX', departureDate: new Date() },
  ];
  columns: string[] = ['flightNumber', 'destination', 'departureDate'];

  ngOnInit(): void {}
}
