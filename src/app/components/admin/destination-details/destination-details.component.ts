import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destination } from 'src/app/models/destination.model'; // Ensure this model exists

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [],
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css'],
})
export class DestinationDetailsComponent implements OnInit {
  destination!: Destination;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const destinationId = this.route.snapshot.paramMap.get('id');
    if (destinationId) {
      this.fetchDestinationDetails(Number(destinationId));
    }
  }

  fetchDestinationDetails(id: number): void {
    // Fetch the destination details (dummy data for now)
    const destinations = [
      { id: 1, name: 'Berlin', country: 'Germany', description: 'Capital of Germany' },
      { id: 2, name: 'Paris', country: 'France', description: 'City of Light' },
      { id: 3, name: 'London', country: 'UK', description: 'Capital of England' },
    ];
    this.destination = destinations.find(d => d.id === id)!;
  }
}
