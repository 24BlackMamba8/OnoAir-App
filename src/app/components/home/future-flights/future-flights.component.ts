import { Component, OnInit } from '@angular/core';

export interface Flight {
  flightNumber: string;
  destinationCode: string;
  departureDate: Date;
}

@Component({
  selector: 'app-future-flights',
  templateUrl: './future-flights.component.html',
  styleUrls: ['./future-flights.component.scss']
})
export class FutureFlightsComponent implements OnInit {
  futureFlights: Flight[] = [
    { flightNumber: 'OA303', destinationCode: 'SFO', departureDate: new Date('2024-01-01') },
    { flightNumber: 'OA404', destinationCode: 'ORD', departureDate: new Date('2024-01-05') },
  ];
  columns: string[] = ['flightNumber', 'destination', 'departureDate'];

  ngOnInit(): void {}
}
