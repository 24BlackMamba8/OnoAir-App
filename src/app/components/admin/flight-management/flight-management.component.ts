// flight-management.component.ts
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Flight } from 'src/app/models/flight.model';
import { FlightDetailsComponent } from 'src/app/components/admin/flight-details/flight-details.component';
import { FlightEditFormComponent } from '../flight-edit-form/flight-edit-form.component';
import { FlightAddFormComponent } from '../flight-add-form/flight-add-form.component'; // ייבוא רכיב הוספת טיסה

@Component({
  selector: 'app-flight-management',
  templateUrl: './flight-management.component.html',
  styleUrls: ['./flight-management.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    //FlightAddFormComponent,
    //FlightEditFormComponent
  ],
})
export class FlightManagementComponent {
  displayedColumns: string[] = ['flightNumber', 'origin', 'destination', 'departure', 'arrival', 'actions'];

  flights: Flight[] = [  // Remove 'const' and declare as a class property
    {
      id: 1,
      flightNumber: 'AA101',
      origin: 'New York',
      destination: 'Los Angeles',
      departure: new Date('2024-05-10T09:00:00'),
      arrival: new Date('2024-05-10T12:00:00'),
      image: 'src/assets/images/new york.jpg',
      seats: 150,
    },
    {
      id: 2,
      flightNumber: 'UA202',
      origin: 'Chicago',
      destination: 'San Francisco',
      departure: new Date('2024-05-15T10:30:00'),
      arrival: new Date('2024-05-15T13:30:00'),
      image: 'src/assets/images/chicago.jpg',
      seats: 120,
    },
    {
      id: 3,
      flightNumber: 'DL303',
      origin: 'Atlanta',
      destination: 'Miami',
      departure: new Date('2024-05-20T14:00:00'),
      arrival: new Date('2024-05-20T16:00:00'),
      image: 'src/assets/images/atlanta.jpg',
      seats: 180,
    },
    {
      id: 4,
      flightNumber: 'SW404',
      origin: 'Dallas',
      destination: 'Denver',
      departure: new Date('2024-05-25T08:30:00'),
      arrival: new Date('2024-05-25T10:00:00'),
      image: 'src/assets/images/Dallas.jpg',
      seats: 200,
    },
    {
      id: 5,
      flightNumber: 'BA505',
      origin: 'London',
      destination: 'Paris',
      departure: new Date('2024-05-30T12:00:00'),
      arrival: new Date('2024-05-30T13:15:00'),
      image: 'src/assets/images/london-uk.jpg',
      seats: 100,
    },
    {
      id: 6,
      flightNumber: 'AF606',
      origin: 'Paris',
      destination: 'Rome',
      departure: new Date('2024-06-05T07:30:00'),
      arrival: new Date('2024-06-05T09:00:00'),
      image: 'src/assets/images/paris.jpg',
      seats: 130,
    },
    {
      id: 7,
      flightNumber: 'LH707',
      origin: 'Frankfurt',
      destination: 'Madrid',
      departure: new Date('2024-06-10T16:00:00'),
      arrival: new Date('2024-06-10T18:30:00'),
      image: 'src/assets/images/frankfurt.jpg',
      seats: 170,
    },
    {
      id: 8,
      flightNumber: 'EK808',
      origin: 'Dubai',
      destination: 'Singapore',
      departure: new Date('2024-06-15T22:00:00'),
      arrival: new Date('2024-06-16T06:00:00'),
      image: 'src/assets/images/dubai.jpeg',
      seats: 250,
    },
    {
      id: 9,
      flightNumber: 'QF909',
      origin: 'Sydney',
      destination: 'Auckland',
      departure: new Date('2024-06-20T13:00:00'),
      arrival: new Date('2024-06-20T16:00:00'),
      image: 'src/assets/images/sydney.jpg',
      seats: 140,
    },
    {
      id: 10,
      flightNumber: 'CX010',
      origin: 'Hong Kong',
      destination: 'Tokyo',
      departure: new Date('2024-06-25T09:00:00'),
      arrival: new Date('2024-06-25T13:00:00'),
      image: 'src/assets/images/hong-kong.webp',
      seats: 190,
    },
    {
      id: 11,
      flightNumber: 'SQ111',
      origin: 'Singapore',
      destination: 'Bangkok',
      departure: new Date('2024-06-30T15:00:00'),
      arrival: new Date('2024-06-30T17:00:00'),
      image: 'src/assets/images/singapore.jpg',
      seats: 160,
    },
    {
      id: 12,
      flightNumber: 'JL212',
      origin: 'Tokyo',
      destination: 'Seoul',
      departure: new Date('2024-07-05T11:00:00'),
      arrival: new Date('2024-07-05T13:30:00'),
      image: 'src/assets/images/tokyo.jpg',
      seats: 150,
    },
  ];

  constructor(public dialog: MatDialog) {}

  viewFlightDetails(flight: Flight): void {
    this.dialog.open(FlightDetailsComponent, {
      data: { flight },
    });
  }

  editFlight(flight: Flight): void {
    const dialogRef = this.dialog.open(FlightEditFormComponent, {
      data: { flight },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.flights.findIndex(f => f.id === result.id);
        if (index !== -1) {
          this.flights[index] = result;
        }
      }
    });
  }

  addFlight(): void {
    const dialogRef = this.dialog.open(FlightAddFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Ensure the new flight has a unique ID
        const newId = Math.max(...this.flights.map(f => f.id)) + 1;
        this.flights.push({ ...result, id: newId });
      }
    });
  }

  openAddFlightDialog(): void {
    const dialogRef = this.dialog.open(FlightAddFormComponent); // פתיחת דיאלוג הוספת טיסה

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // טיפול בתוצאה מהדיאלוג (אם יש צורך)
    });
  }

  openEditFlightDialog(flight: Flight): void { // קבלת אובייקט flight כפרמטר
    const dialogRef = this.dialog.open(FlightEditFormComponent, { // פתיחת דיאלוג עריכת טיסה
      data: { flight } // העברת אובייקט flight לדיאלוג
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // טיפול בתוצאה מהדיאלוג (אם יש צורך)
    });
  }
}
