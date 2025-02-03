import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destination } from 'src/app/models/destination.module'; // Assuming the Destination model is in the parent directory
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-destination-edit-form',
  templateUrl: './destination-edit-form.component.html',
  styleUrls: ['./destination-edit-form.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class DestinationEditFormComponent {

  constructor(
    public dialogRef: MatDialogRef<DestinationEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { destination: Destination }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // TODO: Add logic to save the updated destination data
    console.log('Saving updated destination:', this.data.destination);
    this.dialogRef.close(this.data.destination);
  }
}
