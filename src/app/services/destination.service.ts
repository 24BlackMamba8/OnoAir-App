import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from 'src/app/models/destination.module';  // Correct import path

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private apiUrl = 'https://your-api.com/destinations'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.apiUrl); // Get all destinations from API
  }
}


