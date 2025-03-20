import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

export interface Passenger {
  name: string;
  passportNumber: string;
}

export interface Booking {
  id: number;
  bookingCode: string;
  flightNumber: string;
  passengerCount: number;
  passengers: Passenger[];
  flight: string;
  date: string;
  status: string;
}



@Injectable({ providedIn: 'root' })
export class BookingService {
  private orders: any[] = [];

  constructor() {}

    // פונקציה לעדכון הזמנה
    updateOrder(orderId: string, updatedOrder: any): Observable<any> {
      const index = this.orders.findIndex(order => order.id === orderId);
      if (index !== -1) {
        this.orders[index] = { ...this.orders[index], ...updatedOrder }; // מעדכנים את ההזמנה
        return of(this.orders[index]); // מחזירים את ההזמנה המעודכנת
      }
      return of(null); // אם לא נמצאה הזמנה לעדכון
    }

    refreshOrders(): void {
      // פונקציה לרענן את רשימת ההזמנות, תוכל להוסיף את הלוגיקה המתאימה
    }
    
  addOrder(order: any): void {
    this.orders.push(order);
  }

  getOrders(): any[] {
    return this.orders;
  }

}

