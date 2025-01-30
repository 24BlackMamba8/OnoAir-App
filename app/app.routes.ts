// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HelpSupportComponent } from './components/user/help-support/help-support.component';
import { DestinationManagementComponent } from './components/admin/destination-management/destination-management.component';
import { FlightManagementComponent } from './components/admin/flight-management/flight-management.component';
import { BookAFlightComponent } from './components/user/book-a-flight/book-a-flight.component';
import { MyOrdersComponent } from 'src/app/components/user/my-orders/my-orders.component';
import { RouterModule } from '@angular/router';
import { BookingDetailsComponent } from './components/user/booking-details/booking-details.component';
import { FlightDetailsComponent } from 'src/app/components/admin/flight-details/flight-details.component';
export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'book-a-flight', component: BookAFlightComponent },
  { path: 'destination-management', component: DestinationManagementComponent },
  { path: 'flight-management', component: FlightManagementComponent },
  { path: 'help-support', component: HelpSupportComponent },
  { path: 'user/my-orders', component: MyOrdersComponent },
  { path: 'booking-details/:id', component: BookingDetailsComponent },
  { path: 'flight-details/:id', component: FlightDetailsComponent },
  { path: '**', redirectTo: '' }
];
