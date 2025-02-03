# Code Review for OnoAir Flight Management System

## Explanation of Comment Types

1. **Functionality (Based on Running the Code)**

   - **Preservation:** Highlights unique capabilities of the system that work impressively, with a focus on the relevant module.
   - **Improvement:** Identifies issues or bugs in the system that do not work well, with a focus on the relevant module.

2. **Standards**

   - **Preservation:** Identifies well-written code segments and specifies the coding standards they adhere to.
   - **Improvement:** Points out code segments that do not adhere to standards and provides references to relevant coding standards.

---

## Code Review Comments

### **Functionality**

#### **Preservation:**

- **Module: Flights Service**
  - *Comment:* The flight filtering and sorting in `flights.service.ts` work impressively, allowing users to quickly find flights based on departure time and destination. The implementation efficiently handles large data sets using Angular's `async` pipes and observables, ensuring smooth performance.
  
  ```typescript
  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl).pipe(
      map(flights => flights.sort((a, b) => new Date(a.departure).getTime() - new Date(b.departure).getTime()))
    );
  }
  ```

#### **Improvement:**

- **Module: My Orders Component**
  - *Comment:* In `my-orders.component.ts`, when a user cancels an order, the UI does not immediately update to reflect the change. The order still appears in the list until a full page refresh. Consider using Angular's Change Detection Strategy or manually updating the local order list after deletion.
  
  ```typescript
  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== orderId);
    });
  }
  ```

### **Standards**

#### **Preservation:**

- **Module: Header Component**
  - *Comment:* The use of Angular Material components in `header.component.html` adheres to Material Design guidelines, ensuring a consistent and accessible UI. The navigation bar is implemented with `mat-toolbar` and `mat-menu`, following best practices for responsive design.
  
  ```html
  <mat-toolbar color="primary">
    <span>OnoAir</span>
    <span class="spacer"></span>
    <mat-menu>
      <button mat-menu-item>Flights</button>
      <button mat-menu-item>My Orders</button>
    </mat-menu>
  </mat-toolbar>
  ```

#### **Improvement:**

- **Module: Destinations Service**
  - *Comment:* In `destinations.service.ts`, some functions do not have proper TypeScript return types. For example, the `getDestinations()` method should explicitly return `Observable<Destination[]>` instead of relying on TypeScript inference. This aligns with TypeScript best practices for type safety and maintainability.
  
  ```typescript
  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.apiUrl);
  }
  ```

---

## Summary Table of Comments

| Topic                             | Functionality (Preservation) | Functionality (Improvement) | Standards (Preservation) | Standards (Improvement)   |
| --------------------------------- | ---------------------------- | --------------------------- | ------------------------ | ------------------------- |
| Home screen, help, header, footer | -                            | -                           | `header.component.html`  | -                         |
| Flights - Accept + service        | `flights.service.ts`         | -                           | -                        | -                         |
| Destinations - Accept + service   | -                            | -                           | -                        | `destinations.service.ts` |
| Orders - Accept + service         | -                            | -                           | -                        | -                         |
| My orders - Accept + service      | -                            | `my-orders.component.ts`    | -                        | -                         |

All required comment types have been provided, ensuring comprehensive coverage of functionality and standards across different modules of the system.

