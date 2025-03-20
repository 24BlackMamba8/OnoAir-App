// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { FlightService } from './app/services/flight.service';
import { appRoutes } from './app/app.routes';
import { MyOrdersComponent } from 'src/app/components/user/my-orders/my-orders.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: '',
        loadComponent: () => import('./app/components/shared/header/header.component').then(m => m.HeaderComponent),
        children: [
          { path: '', loadComponent: () => import('./app/components/home/home.component').then(m => m.HomeComponent) },
          { path: 'book-a-flight', loadComponent: () => import('./app/components/user/book-a-flight/book-a-flight.component').then(m => m.BookAFlightComponent) },
          { path: 'destination-management', loadComponent: () => import('./app/components/admin/destination-management/destination-management.component').then(m => m.DestinationManagementComponent) },
          { path: 'flight-management', loadComponent: () => import('./app/components/admin/flight-management/flight-management.component').then(m => m.FlightManagementComponent) },
          { path: 'last-minute-flights', loadComponent: () => import('src/app/components/home/last-minute-flights/last-minute-flights.component').then(m => m.LastMinuteFlightsComponent) },
          { path: 'help-support', loadComponent: () => import('src/app/components/user/help-support/help-support.component').then(m => m.HelpSupportComponent) },
           { path: 'user/my-orders', component: MyOrdersComponent }
          // ... add other routes here ...
        ]
      },
      { path: '**', redirectTo: '' }
    ]),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
  ],
}).catch(err => console.error(err));
