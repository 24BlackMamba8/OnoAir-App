import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Flight } from 'src/app/models/flight.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FlightService } from 'src/app/services/flight.service';
import { ChangeDetectorRef } from '@angular/core';
import { BookingDetailsDialogComponent } from 'src/app/components/user/booking-details-dialog/booking-details-dialog.component';  // כולל את הדיאלוג החדש
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/models/passenger.module';  // עדכן את הנתיב בהתאם
import { FlightDetailsComponent } from 'src/app/components/admin/flight-details/flight-details.component';
import { Order } from 'src/app/models/order.model';
import { BookingService } from 'src/app/services/booking.service';
import { LuggageDialogComponent } from 'src/app/components/user/luggage-dialog/luggage-dialog.component';

@Component({
  selector: 'app-future-bookings-dialog.component',
  templateUrl: './future-bookings-dialog.component.html',
  styleUrls: ['./future-bookings-dialog.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,
  ],
})
export class FutureBookingsDialogComponent implements OnInit {
  step: 'passengers' | 'seats' | 'book'| 'luggage' = 'passengers'; // הוספת שלב 'book'
 // ✅ משתנה לשליטה במעבר השלבים
  numSeats: number = 1;
  selectedFlight!: Flight;
  flight!: Flight;
  orders: Order[] = [];
  order: Order | null = null; // ✅ הגדרת המשתנה כדי למנוע שגיאות
  today = new Date();
  bookings: Order[] = [];
  passengers: Passenger[] = [];
  selectedSeats: string[] = [];
  occupiedSeats = [
    { row: 2, index: 1 },
    { row: 3, index: 4 }
  ];
  seatMap: string[][] = [
    ['A1', 'A2', 'A3', '', 'A4', 'A5', 'A6'],
    ['B1', 'B2', 'B3', '', 'B4', 'B5', 'B6'],
    ['C1', 'C2', 'C3', '', 'C4', 'C5', 'C6'],
    ['D1', 'D2', 'D3', '', 'D4', 'D5', 'D6'],
    ['E1', 'E2', 'E3', '', 'E4', 'E5', 'E6'],
    ['F1', 'F2', 'F3', '', 'F4', 'F5', 'F6'],
    ['', '', '', '', '', '', ''], // מעבר חירום
    ['G1', 'G2', 'G3', '', 'G4', 'G5', 'G6'],
    ['H1', 'H2', 'H3', '', 'H4', 'H5', 'H6'],
    ['I1', 'I2', 'I3', '', 'I4', 'I5', 'I6'],
    ['J1', 'J2', 'J3', '', 'J4', 'J5', 'J6'],
    ['K1', 'K2', 'K3', '', 'K4', 'K5', 'K6'],
    ['L1', 'L2', 'L3', '', 'L4', 'L5', 'L6'],
    ['M1', 'M2', 'M3', '', 'M4', 'M5', 'M6'],
    ['N1', 'N2', 'N3', '', 'N4', 'N5', 'N6'],
    ['O1', 'O2', 'O3', '', 'O4', 'O5', 'O6'],
    ['P1', 'P2', 'P3', '', 'P4', 'P5', 'P6'],
    ['', '', '', '', '', '', ''], // מעבר נוסף
    ['Q1', 'Q2', 'Q3', '', 'Q4', 'Q5', 'Q6'],
    ['R1', 'R2', 'R3', '', 'R4', 'R5', 'R6'],
    ['S1', 'S2', 'S3', '', 'S4', 'S5', 'S6'],
    ['T1', 'T2', 'T3', '', 'T4', 'T5', 'T6'],
    ['U1', 'U2', 'U3', '', 'U4', 'U5', 'U6'],
    ['V1', 'V2', 'V3', '', 'V4', 'V5', 'V6'],
    ['W1', 'W2', 'W3', '', 'W4', 'W5', 'W6'],
    ['X1', 'X2', 'X3', '', 'X4', 'X5', 'X6'],
    ['Y1', 'Y2', 'Y3', '', 'Y4', 'Y5', 'Y6'],
    ['Z1', 'Z2', 'Z3', '', 'Z4', 'Z5', 'Z6'],
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: {
      flight: Flight; selectedSeats: string[];
      isEdit?: boolean;
      passengerCount?: number;  // הוספת passengerCount
      passengers: { firstName: string; lastName: string; passportNumber: string }[]},

    private flightService: FlightService,
    private bookingService: BookingService,
    private dialogRef: MatDialogRef<FutureBookingsDialogComponent>
    ) {
       this.selectedSeats = data.selectedSeats || [];
        // אם יש isEdit, יש לעדכן את כל שאר המידע
  if (this.data && this.data.isEdit) {
    this.numSeats = this.data.passengerCount || 1; // אם passengerCount לא מוגדר, תן ערך ברירת מחדל של 1
    this.passengers = this.data.passengers;
    this.selectedSeats = this.data.selectedSeats;
    // עדכון פרטים נוספים לפי הצורך
  }
    }

  openFutureBookingsDialog(): void {
    console.log("Opening dialog with flight data:", this.selectedFlight);

    this.dialog.open(FutureBookingsDialogComponent, {
      width: '500px',
      data: { flight: this.selectedFlight }
    });
  }

  ngOnInit(): void {
    console.log("Received data in dialog:", this.data);
    if (this.data && this.data.flight) {
      this.selectedFlight = this.data.flight;
      this.cdRef.detectChanges();
      console.log("Flight Image URL:", this.selectedFlight.image);


      if (!this.selectedFlight.seats || this.selectedFlight.seats <= 0) {
        console.error("Invalid number of seats:", this.selectedFlight.seats);
        this.dialogRef.close();
        return;
      }

      this.updateSeatsArray();
    } else {
      console.error("No flight data available");
      this.dialogRef.close();
    }
  }

  updateSeatsArray(): void {
    this.passengers = Array.from({ length: this.numSeats }, () => ({
      firstName: '',
      lastName: '',
      passportNumber: '',  // הוספת השדה החסר
      selectedSeat: undefined, // אופציונלי
    }));
  }


  isFormValid(): boolean {
    return this.passengers.every(p => p.firstName.trim() !== '' && p.lastName.trim() !== '');
  }

  nextStep(): void {
    if (this.isFormValid()) {
      console.log('Passengers:', this.passengers);
      if (this.step === 'passengers') {
        this.step = 'seats'; // אם בשלב של 'passengers', עבור לשלב 'seats'
      } else if (this.step === 'seats') {
        this.step = 'book'; // אם בשלב של 'seats', עבור לשלב 'book'
      }
      console.log('Current Step:', this.step); // הדפסת השלב הנוכחי לצורך debugging
    }
  }

  selectSeat(rowIndex: number, seatIndex: number): void {
    const seatLabel = this.getSeatLabel(rowIndex, seatIndex);

    // אם המושב כבר נבחר, נבטל את הבחירה
    if (this.selectedSeats.includes(seatLabel)) {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatLabel);
    } else {
      // אם לא עברנו את מספר המושבים שהוקצו לנוסעים, נבחר את המושב
      if (this.selectedSeats.length < this.numSeats) {
        this.selectedSeats.push(seatLabel);
      }
    }

    // עדכון המושב של הנוסע הנוכחי (רק אם יש מספיק נוסעים)
    const currentPassengerIndex = this.selectedSeats.length - 1;
    if (currentPassengerIndex < this.passengers.length) {
      this.passengers[currentPassengerIndex].selectedSeat = seatLabel;
    }
  }

    openLuggageDialog(passenger: Passenger) {
      const dialogRef = this.dialog.open(LuggageDialogComponent, {
        width: '400px',
        data: { luggage: passenger.luggage }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          passenger.luggage = result; // שמירת המטען שנבחר
        }
      });
    }

    goToLuggageStep() {
      this.step = 'luggage';
    }

  editBooking(order: any): void {
    const dialogRef = this.dialog.open(FutureBookingsDialogComponent, {
      width: '800px',
      data: {
        flight: order.flight,
         passengers: order.passengers,
          selectedSeats: order.selectedSeats,
           passengerCount: order.passengerCount,
            date: order.date,
             status: order.status,
              isEdit: true
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // עדכן את ההזמנה בשירות
        this.bookingService.updateOrder(order.id, result);
        this.refreshOrders();
      }
    });
  }

  confirmSeats(): void {
    if (this.selectedSeats.length > 0) {
      console.log('Saving to localStorage...');
      localStorage.setItem('selectedFlight', JSON.stringify(this.selectedFlight));
      localStorage.setItem('passengers', JSON.stringify(this.passengers));
      localStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));

      // יצירת אובייקט הזמנה חדש
      const booking = {
        flight: this.selectedFlight,
        passengers: this.passengers,
        selectedSeats: this.selectedSeats,
        passengerCount: this.passengers.length,
        date: new Date().toISOString() // שמירת תאריך ביצוע ההזמנה
      };

      // שליפת ההזמנות הקיימות
      let existingOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');

      // בדיקה אם ההזמנה כבר קיימת (מניעת כפילות)
      const isDuplicate = existingOrders.some((order: any) =>
        order.flight.flightNumber === booking.flight.flightNumber &&
        JSON.stringify(order.selectedSeats) === JSON.stringify(booking.selectedSeats)
      );


      if (!isDuplicate) {
        existingOrders.push(booking);
        localStorage.setItem('myOrders', JSON.stringify(existingOrders));
      } else {
        console.log('Duplicate booking detected, skipping save.');
      }

      // עדכון השלב ל-"book"
      this.step = 'book';

      // הצגת הדיאלוג בפעם הראשונה בלבד
      if (!this.passengers || this.passengers.length === 0) {
        console.log('Opening dialog for first time...');
        this.dialog.open(FutureBookingsDialogComponent, {
          width: '500px',
          data: booking
        });
      } else {
        console.log('Dialog already shown before, skipping...');
      }
    } else {
      console.log('No seats selected.');
    }
  }




  confirmBooking(): void {
    this.order = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000).toString(),
      bookingCode: 'LM' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      flightNumber: this.selectedFlight.flightNumber,
      passengerCount: this.passengers.length,
      passengers: this.passengers,
      status: 'pending',
      date: new Date(),
      flight: this.selectedFlight, // ✅ שמירת פרטי הטיסה
    };

    console.log('✅ הזמנה נוצרה:', this.order);
  }


  isSelected(seatLabel: string): boolean {
    return this.selectedSeats.includes(seatLabel);
  }


  isOccupied(rowIndex: number, seatIndex: number): boolean {
    return this.occupiedSeats.some(seat => seat.row === rowIndex && seat.index === seatIndex);
  }

  isExitRow(rowIndex: number): boolean {
    const exitRows = [10, 20]; // התאמה למפת מושבים אמיתית
    return exitRows.includes(rowIndex);
  }
  isAisle(rowIndex: number, seatIndex: number): boolean {
    return this.seatMap[rowIndex][seatIndex] === ''; // בדיקה אם המקום ריק (מעבר)
  }

  canProceed(): boolean {
    // בדוק אם כל הנוסעים בחרו מושב
    return this.passengers.every(passenger => passenger.selectedSeat !== undefined);
  }

viewFlightDetails(order: Order) {
  const dialogRef = this.dialog.open(FlightDetailsComponent, {
    width: '600px',
    data: { flight: order.flight }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Flight details dialog closed', result);
  });
}

  getSeatLabel(rowIndex: number, seatIndex: number): string {
    return (rowIndex + 1) + String.fromCharCode(65 + seatIndex);
  }

  get upcomingOrders() {
    return this.bookings.filter(order => order.date >= this.today);
  }


  cancelBooking(): void {
    localStorage.removeItem('selectedFlight');
    localStorage.removeItem('passengers');
    localStorage.removeItem('selectedSeats');
    this.dialogRef.close(); // סוגר את הדיאלוג
  }

  closeDialog(): void {
    const newOrder = {
      flight: this.selectedFlight,
      passengers: this.passengers,
      selectedSeats: this.selectedSeats,
      passengerCount: this.numSeats,
      date: new Date(),
      status: 'Confirmed'
    };

    this.bookingService.addOrder(newOrder); // שמור את ההזמנה בשירות

    this.dialogRef.close(newOrder);
  }

  prevStep(): void {
    this.step = 'passengers';
  }

  refreshOrders(): void {
    this.orders = this.bookingService.getOrders();
  }
}
