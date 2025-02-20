import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for the dialog
import { Flight } from 'src/app/models/flight.model'; // Import the Flight interface
import { OrderService } from 'src/app/services/orders.service'; // Order service for handling bookings
import { FlightEditFormComponent } from 'src/app/components/admin/flight-edit-form/flight-edit-form.component';


@Component({
  selector: 'app-future-flights',
  imports: [CommonModule], // Include CommonModule for ngFor
  templateUrl: './future-flights.component.html',
  styleUrls: ['./future-flights.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class FutureFlightsComponent {
  flights: Flight[] = []; // Define flights array to hold future flight data

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  // Open booking dialog (example method, adjust as needed)
  openBookingDialog(flight: Flight) {
    const dialogRef = this.dialog.open(FlightEditFormComponent, {
      width: '400px',
      data: flight
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result, like booking confirmation or updates
      }
    });
  }
}

