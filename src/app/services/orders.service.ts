import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from '../models/order.model';
import { map } from 'rxjs/operators'; // הייבוא הנדרש של map

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);  // זרם נתונים להזמנות
  orders$ = this.ordersSubject.asObservable();  // Observable שמספק את ההזמנות לכל המנויים

  constructor() {}

  // קבלת כל ההזמנות
  getOrders(): Observable<Order[]> {
    return this.orders$;
  }

  // יצירת הזמנה חדשה והוספתה לרשימה
  createOrder(order: Order): void {
    this.orders.push(order); // שמירת ההזמנה במערך
    this.ordersSubject.next([...this.orders]); // עדכון כל המנויים עם הרשימה החדשה
  }

  // הוספת הזמנה ישירות לרשימה (אם צריך)
  addOrder(order: Order): void {
    this.createOrder(order); // קריאה לפונקציה הראשית שמוסיפה ומעדכנת
  }

  // חיפוש הזמנה לפי ID
  getOrderById(id: string): Observable<Order | undefined> {
    return this.orders$.pipe(
      map((orders) => orders.find(order => order.id.toString() === id))
    );
  }

}
