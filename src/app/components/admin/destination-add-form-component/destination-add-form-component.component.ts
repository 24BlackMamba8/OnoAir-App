import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Destination } from 'src/app/models/destination.module'; // Assuming the Destination model is in the parent directory
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-destination-add-form',
  templateUrl: './destination-add-form-component.component.html',
  styleUrls: ['./destination-add-form-component.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class DestinationAddFormComponent {
  newDestination: Destination = {
    destinationCode: '',
    destinationName: '',
    imageUrl: '',
    airportName: '',
    airportWebsite: '',
    emailAddress: ''
  };

  constructor(public dialogRef: MatDialogRef<DestinationAddFormComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // TODO: Add logic to save the new destination (e.g., send to a backend service)
    console.log('Saving new destination:', this.newDestination);
    this.dialogRef.close(this.newDestination);
  }
}
