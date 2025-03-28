import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent {
  seatMap: (string | null)[][] = [
    ['A1', 'A2', null, 'A3', 'A4'],
    ['B1', 'B2', null, 'B3', 'B4'],
    ['C1', 'C2', null, 'C3', 'C4'],
    ['D1', 'D2', null, 'D3', 'D4']
  ];
  passengers: { firstName: string; lastName: string }[] = [];
  selectedSeats: string[] = [];
  occupiedSeats = [
    { row: 2, index: 1 },
    { row: 3, index: 4 }
  ];

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  selectSeat(row: number, col: number) {
    const seat = this.seatMap[row][col];
    if (seat && !this.selectedSeats.includes(seat)) {
      this.selectedSeats.push(seat);
    }
  }

  isSelected(seat: string | null): boolean {
    return seat !== null && this.selectedSeats.includes(seat);
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
    return this.selectedSeats.length === this.flightService.getPassengers().length;
  }

  confirmSeats() {
    this.flightService.saveSeats(this.selectedSeats).subscribe(response => {
      console.log('Seats saved:', response);
      this.router.navigate(['/payment']);
    });
  }

  ngOnInit(): void {
    this.passengers = this.flightService.getPassengers();
    console.log('Passengers in SeatSelectionComponent:', this.passengers);
  }
}
