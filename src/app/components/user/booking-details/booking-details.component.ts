import { Component, OnInit ,Inject  } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})

export class BookingDetailsComponent implements OnInit {
  order$: Observable<Order | undefined>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<BookingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
  ) {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getOrderById(orderId || ''); // קריאה לשירות
  }
  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id'); // קבלת ה-ID מה-URL
    if (orderId) {
      this.order$ = this.orderService.getOrderById(orderId); // שמירת ה-Observable
    }
  }
}

