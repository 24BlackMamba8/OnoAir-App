import { Component, OnInit, Type } from '@angular/core';
import { DatePipe } from '@angular/common';  // ייבוא DatePipe
import { MatCardModule } from '@angular/material/card';  // ייבוא MatCardModule
import { CommonModule } from '@angular/common';  // ייבוא CommonModule
import { BookingService } from 'src/app/services/booking.service';
import { FlightDetailsComponent } from 'src/app/components/admin/flight-details/flight-details.component';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from 'src/app/components/user/booking-dialog/booking-dialog.component'; // ייבא את הדיאלוג
import { LastMinuteBookingsComponent } from 'src/app/components/user/last-minute-bookings-dialog/last-minute-bookings.component'; // ייבוא LastMinuteBookingsComponent
import { UpcomingBookingsDialogComponent } from '../upcoming-bookings-dialog/upcoming-bookings-dialog.component'; // ייבוא UpcomingBookingsDialogComponent
import { FutureBookingsDialogComponent } from '../future-bookings-dialog/future-bookings-dialog.component'; // ייבוא FutureBookingsDialogComponent
import { PreviousBookingsDialogComponent } from '../previous-bookings-dialog/previous-bookings-dialog.component'; // ייבוא PreviousBookingsDialogComponent



@Component({
  selector: 'app-my-orders',
  standalone: true,  // מציין שזו קומפוננטה סטנדלון
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers: [DatePipe],  // הוספת DatePipe ל-providers של הקומפוננטה
  imports: [MatCardModule, CommonModule]  // הוספת MatCardModule לרשימת ה-imports
})

export class MyOrdersComponent implements OnInit {

    // מערך הזמנות
    orders: any[] = [];
    upcomingOrders: any[] = [];
    lastMinuteOrders: any[] = [];
    previousOrders: any[] = [];

     // משתנים עבור טיסה ונוסעים
  selectedFlight: any;
  passengers: any[] = [];
  numSeats: number;
  selectedSeats: string[] = [];
  step: string = 'passengers';  // כל שלב בתהליך


  // דוגמת נתונים להזמנות
  upcomingOrdersExmple = [
    {
      id: 1,
      flight: {
        origin: 'New York',
        destination: 'London',
        departure: new Date('2025-04-01T14:30:00'),
        arrival: new Date('2025-04-01T22:30:00'),
        flightNumber: 'NYL1001',
        image: 'assets/images/london-uk.jpg'
      },
      passengerCount: 2,
      selectedSeats: ['12A', '12B'],
      passengers: [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Doe' }
      ],
      date: new Date('2025-03-15'),
      status: 'Confirmed'
    }
  ];

  lastMinuteOrdersExmple = [
    {
      id: 2,
      flight: {
        origin: 'Paris',
        destination: 'Munich',
        departure: new Date('2025-03-25T08:00:00'),
        arrival: new Date('2025-03-25T09:30:00'),
        flightNumber: 'PRB2054',
        image: 'assets/images/munich.jpg'
      },
      passengerCount: 1,
      selectedSeats: ['3A'],
      passengers: [
        { firstName: 'Alice', lastName: 'Smith' }
      ],
      date: new Date('2025-03-20'),
      status: 'Pending'
    }
  ];

  previousOrdersExmple = [
    {
      id: 3,
      flight: {
        origin: 'Tokyo',
        destination: 'las-vegas',
        departure: new Date('2025-02-10T13:00:00'),
        arrival: new Date('2025-02-10T19:00:00'),
        flightNumber: 'TKL450',
        image: 'assets/images/las-vegas.jfif'
      },
      passengerCount: 3,
      selectedSeats: ['10A', '10B', '10C'],
      passengers: [
        { firstName: 'Michael', lastName: 'Johnson' },
        { firstName: 'Sarah', lastName: 'Johnson' },
        { firstName: 'David', lastName: 'Johnson' }
      ],
      date: new Date('2025-02-01'),
      status: 'Completed'
    }
  ];

  constructor(
    private bookingService: BookingService,
    public dialog: MatDialog

    ) {
    this.numSeats = 1;

  }

  ngOnInit(): void {
    this.orders = this.bookingService.getOrders();
    this.lastMinuteOrders = this.bookingService.getOrdersByType('lastMinute');
    this.upcomingOrders = this.bookingService.getOrdersByType('upcoming');
    this.previousOrders = this.bookingService.getOrdersByType('previous');
  }

   // מנגנון לעדכון הזמנות
   addBooking() {
    const order = {
      flight: this.selectedFlight,
      passengerCount: this.numSeats,
      selectedSeats: this.selectedSeats,
      passengers: this.passengers,
      date: new Date(),
      status: 'Upcoming'
    };
    this.upcomingOrders.push(order);
  }

  // פונקציה לשמירת ההזמנה
  saveBooking() {
    const booking = {
      flight: this.selectedFlight,
      selectedSeats: this.selectedSeats,
      passengers: this.passengers,
      passengerCount: this.selectedSeats.length,
      date: new Date(),
      status: 'Upcoming', // או 'Confirmed' תלוי במצב ההזמנה
    };

    // הוספת ההזמנה לרשימה
    this.upcomingOrders.push(booking);

    // אכילת הודעה, לדוג' הצלחה או מעבר שלב
    console.log('Booking saved:', booking);
  }



  // בשלב אישור ההזמנה
  confirmSeats() {
    this.saveBooking(); // שמור את ההזמנה לאחר אישור המושבים
    this.addBooking();
    this.step = 'book'; // לאחר שמאשרים את המושבים, המעבר לשלב אישור הזמנה
  }

  // חזרה לשלב הקודם
  prevStep() {
    if (this.step === 'seats') {
      this.step = 'passengers';
    }
  }

   // הצגת פרטי טיסה בעמוד הזמנות
   viewFlightDetails(order: any, type: string) {
    let dialogComponent: Type<any>; // שינוי סוג dialogComponent
    let dialogData;


    switch (type) {
      case 'upcoming':
        dialogComponent = UpcomingBookingsDialogComponent;
        dialogData = { booking: order };
        break;
      case 'lastMinute':
        dialogComponent = LastMinuteBookingsComponent;
        dialogData = { booking: order };
        break;
        case 'future':
          dialogComponent = FutureBookingsDialogComponent;
          dialogData = { booking: order };
          break;
      default:
        dialogComponent = FlightDetailsComponent;
        dialogData = {
          flight: order.flight,
          passengers: order.passengers,
          selectedSeats: order.selectedSeats,
          passengerCount: order.passengerCount,
          date: order.date,
          status: order.status,
        };
        break;
    }

    this.dialog.open(dialogComponent, {
      width: '600px',
      data: dialogData,
    });
  }


  editBooking(order: any): void {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '800px',
      data: {
        flight: order.flight,
        passengers: order.passengers,
        selectedSeats: order.selectedSeats,
        passengerCount: order.passengerCount,
        date: order.date,
        status: order.status,
        isEdit: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookingService.updateOrder(order.id, result);
        this.refreshOrders();
      }
    });
  }

  // מחיקת הזמנה
  cancelBooking(orderId: string): void {
    // הוסף לוגיקה לביטול הזמנה
    console.log(`Booking with ID ${orderId} canceled.`);
    this.bookingService.cancelOrder(orderId);
    this.refreshOrders();
  }

  refreshOrders(): void {
    this.orders = this.bookingService.getOrders();
    this.lastMinuteOrders = this.bookingService.getOrdersByType('lastMinute');
    this.upcomingOrders = this.bookingService.getOrdersByType('upcoming');
    this.previousOrders = this.bookingService.getOrdersByType('previous');
    this.lastMinuteOrdersExmple = this.bookingService.getOrdersByType('lastMinute');
    this.upcomingOrdersExmple = this.bookingService.getOrdersByType('upcoming');
    this.previousOrdersExmple = this.bookingService.getOrdersByType('previous');
  }
}
