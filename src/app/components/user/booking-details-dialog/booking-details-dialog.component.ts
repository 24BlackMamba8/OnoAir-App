import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Flight } from 'src/app/models/flight.model';
import { CommonModule } from '@angular/common';  // הוספת CommonModule
import { Router } from '@angular/router';


@Component({
  selector: 'app-booking-details-dialog',
  standalone: true, // חשוב! מגדירים את הקומפוננטה כ-standalone
  imports: [  MatDialogModule,CommonModule], // יש להוסיף את CommonModule או NgFor כאן
  templateUrl: './booking-details-dialog.component.html', // מייבאים את התבנית
  styleUrls: ['./booking-details-dialog.component.css'] // מייבאים את ה-CSS
})
export class BookingDetailsDialogComponent {

  selectedFlight: Flight; // הגדרת משתנה עבור פרטי הטיסה
  passengers: any[] = []; // רשימת נוסעים
  selectedSeats: string[] = []; // מושבים שנבחרו
  numSeats: number = 1; // מספר מושבים שנבחרו

  constructor(
    private dialogRef: MatDialogRef<BookingDetailsDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { flight: Flight; passengers: any[]; selectedSeats: string[] }
  ) {
    this.selectedFlight = data.flight || {} as Flight;
    this.passengers = data.passengers || [];
    this.selectedSeats = data.selectedSeats || [];
  }

  closeDialog() {
    this.dialogRef.close(); // Close the dialog when the button is clicked
  }

  cancelBooking(): void {
    localStorage.removeItem('selectedFlight');
    localStorage.removeItem('passengers');
    localStorage.removeItem('selectedSeats');
    this.dialogRef.close(); // סוגר את הדיאלוג
  }

  ngOnInit(): void {
    this.selectedFlight = JSON.parse(localStorage.getItem('selectedFlight') || '{}');
    this.passengers = JSON.parse(localStorage.getItem('passengers') || '[]');
    this.selectedSeats = JSON.parse(localStorage.getItem('selectedSeats') || '[]');
  }

}
