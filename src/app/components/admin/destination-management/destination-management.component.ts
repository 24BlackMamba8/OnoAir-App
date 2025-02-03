//destination-management.component.ts
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Destination } from 'src/app/models/destination.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DestinationAddFormComponent } from 'src/app/components/admin/destination-add-form-component/destination-add-form-component.component';
import { DestinationEditFormComponent } from 'src/app/components/admin/destination-edit-form/destination-edit-form.component';

@Component({
  selector: 'app-destination-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './destination-management.component.html',
  styleUrls: ['./destination-management.component.css'],
})
export class DestinationManagementComponent {
  displayedColumns: string[] = [
    'destinationCode',
    'destinationName',
    'imageUrl',
    'airportName',
    'airportWebsite',
    'emailAddress',
    'destinationEdit'
  ];

  destinations: Destination[] = [
    {
      destinationCode: 'CDG',
      destinationName: 'Paris',
      imageUrl: 'https://via.placeholder.com/150',
      airportName: 'Charles de Gaulle Airport',
      airportWebsite: 'https://www.parisaeroport.fr/en',
      emailAddress: 'info@parisaeroport.fr',
    },
    {
      destinationCode: 'AMS',
      destinationName: 'Amsterdam',
      imageUrl: 'https://via.placeholder.com/150',
      airportName: 'Amsterdam Airport Schiphol',
      airportWebsite: 'https://www.schiphol.nl/en/',
      emailAddress: 'info@schiphol.nl',
    },
    {
      destinationCode: 'DXB',
      destinationName: 'Dubai',
      imageUrl: 'https://via.placeholder.com/150',
      airportName: 'Dubai International Airport',
      airportWebsite: 'https://www.dubaiairports.ae/',
      emailAddress: 'feedback@dubaiairports.ae',
    },
    {
      destinationCode: 'HND',
      destinationName: 'Tokyo',
      imageUrl: 'https://via.placeholder.com/150',
      airportName: 'Haneda Airport',
      airportWebsite: 'https://www.tokyo-airport-bldg.co.jp/en/',
      emailAddress: 'info@tokyo-airport-bldg.co.jp',
    },
    {
      destinationCode: 'FRA',
      destinationName: 'Frankfurt',
      imageUrl: 'https://via.placeholder.com/150',
      airportName: 'Frankfurt Airport',
      airportWebsite: 'https://www.frankfurt-airport.com/en.html',
      emailAddress: 'info@fraport.de',
    },
    {
      destinationCode: 'IST',
      destinationName: 'Istanbul',
      imageUrl: 'https://via.placeholder.com/150',
      airportName: 'Istanbul Airport',
      airportWebsite: 'https://www.istairport.com/en',
      emailAddress: 'info@igairport.com',
    },
    {
      destinationCode: 'MAD',
      destinationName: 'Madrid',
      imageUrl: 'https://via.placeholder.com/150',
      airportName: 'Adolfo Suárez Madrid–Barajas Airport',
      airportWebsite: 'https://www.aena.es/en/madrid-barajas.html',
      emailAddress: 'info@aena.es',
    },
    {
      destinationCode: 'SIN',
      destinationName: 'Singapore',
      imageUrl: 'https://via.placeholder.com/150',
      airportName: 'Singapore Changi Airport',
      airportWebsite: 'https://www.changiairport.com/',
      emailAddress: 'enquiry@changiairport.com',
    },
    {
      destinationCode: 'SYD',
      destinationName: 'Sydney',
      imageUrl: 'https://via.placeholder.com/150',
      airportName: 'Sydney Airport',
      airportWebsite: 'https://www.sydneyairport.com.au/',
      emailAddress: 'info@sydneyairport.com.au',
    },
  ];

  constructor(private dialog: MatDialog) { }

  updateDestinationName(destination: Destination) {
    console.log('Updating destination name for:', destination);
    // TODO: Add logic to send an update to your backend
  }

  openEditForm(destination: Destination) {
    const dialogRef = this.dialog.open(DestinationEditFormComponent, {
      width: '400px',
      data: { destination: destination }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // TODO: Handle the result from the edit form (e.g., update the table)
    });
  }

  openAddDestinationDialog() {
    const dialogRef = this.dialog.open(DestinationAddFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.destinations.push(result);
      }
    });
  }
}
