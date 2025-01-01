import { Component, OnInit } from '@angular/core';
import { Destination } from 'src/app/models/destination.model';

@Component({
  selector: 'app-destination-management',
  templateUrl: './destination-management.component.html',
  styleUrls: ['./destination-management.component.scss']
})
export class DestinationManagementComponent implements OnInit {

  // Sample data for destinations
  destinations: Destination[] = [
    {
      name: 'New York',
      imageUrl: 'https://example.com/nyc.jpg',
      airportName: 'John F. Kennedy International Airport',
      airportWebsite: 'https://www.jfkairport.com',
      emailAddress: 'info@jfkairport.com',
      destinationCode: 'NYC'
    },
    {
      name: 'London',
      imageUrl: 'https://example.com/lon.jpg',
      airportName: 'Heathrow Airport',
      airportWebsite: 'https://www.heathrow.com',
      emailAddress: 'info@heathrow.com',
      destinationCode: 'LON'
    },
    {
      name: 'Paris',
      imageUrl: 'https://example.com/paris.jpg',
      airportName: 'Charles de Gaulle Airport',
      airportWebsite: 'https://www.parisaeroport.fr/en',
      emailAddress: 'contact@parisaeroport.fr',
      destinationCode: 'PAR'
    },
    {
      name: 'Tokyo',
      imageUrl: 'https://example.com/tokyo.jpg',
      airportName: 'Narita International Airport',
      airportWebsite: 'https://www.narita-airport.jp/en',
      emailAddress: 'info@narita-airport.jp',
      destinationCode: 'TOK'
    },
    {
      name: 'Sydney',
      imageUrl: 'https://example.com/sydney.jpg',
      airportName: 'Sydney Kingsford Smith Airport',
      airportWebsite: 'https://www.sydneyairport.com.au',
      emailAddress: 'info@sydneyairport.com.au',
      destinationCode: 'SYD'
    },
    {
      name: 'Dubai',
      imageUrl: 'https://example.com/dubai.jpg',
      airportName: 'Dubai International Airport',
      airportWebsite: 'https://www.dubaiairports.ae',
      emailAddress: 'info@dubaiairports.ae',
      destinationCode: 'DXB'
    },
    {
      name: 'Los Angeles',
      imageUrl: 'https://example.com/la.jpg',
      airportName: 'Los Angeles International Airport',
      airportWebsite: 'https://www.flylax.com',
      emailAddress: 'info@lax.com',
      destinationCode: 'LAX'
    },
    {
      name: 'Barcelona',
      imageUrl: 'https://example.com/barcelona.jpg',
      airportName: 'Barcelona El Prat Airport',
      airportWebsite: 'https://www.aeropuerto-barcelona-el-prat.com/en',
      emailAddress: 'info@aeropuerto-barcelona-el-prat.com',
      destinationCode: 'BCN'
    },
    {
      name: 'Berlin',
      imageUrl: 'https://example.com/berlin.jpg',
      airportName: 'Berlin Brandenburg Airport',
      airportWebsite: 'https://www.berlin-airport.de/en',
      emailAddress: 'info@berlin-airport.de',
      destinationCode: 'BER'
    },
    {
      name: 'Rome',
      imageUrl: 'https://example.com/rome.jpg',
      airportName: 'Leonardo da Vinci International Airport',
      airportWebsite: 'https://www.adr.it/web/aeroporti-di-roma-en-',
      emailAddress: 'info@adr.it',
      destinationCode: 'ROM'
    }
  ];

  columns: string[] = ['name', 'airportName', 'destinationCode', 'imageUrl', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  // Function to view destination details (optional functionality)
  viewDestinationDetails(destination: Destination): void {
    // Implement logic to view destination details, e.g., navigate to a detailed view page
    console.log('Viewing destination:', destination);
  }
}
