import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Flight } from 'src/app/models/flight.model';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FlightService } from 'src/app/services/flight.service';
import { Order } from 'src/app/models/order.model'; // אם המודל נמצא בנתיב הזה
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe,MatDialogModule],
  providers: [{ provide: LOCALE_ID, useValue: 'en-US' }] // הגדר את LOCALE_ID כאן
})
export class FlightDetailsComponent {
  flight!: Flight;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flightService: FlightService,
    public dialogRef: MatDialogRef<FlightDetailsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LOCALE_ID) public locale: string,
  ) {}

  onClose(): void {
    this.dialogRef.close(); // Close the dialog
  }


  viewFlightDetails(order: Order) {
    this.dialog.open(FlightDetailsComponent, {
      width: '600px',
      data: { flight: order.flight } // ✅ מעביר את הנתונים לדיאלוג
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const flightId = params.get('id');
      console.log(flightId); // או טיפול במידע אחר
    });
  }

}

