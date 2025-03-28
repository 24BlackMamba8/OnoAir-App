import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 חובה בשביל ngModel
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


interface LuggageItem {
  type: string;
  quantity: number;
  weight: number;  // משקל המזוודה
}

@Component({
  selector: 'app-luggage-dialog',
  standalone: true,
  templateUrl: './luggage-dialog.component.html',
  styleUrls: ['./luggage-dialog.component.css'],
  imports: [
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule  
  ]
})

export class LuggageDialogComponent {
  luggageOptions: LuggageItem[] = [
    { type: 'Carry-On Bag', quantity: 0, weight: 5 },
    { type: 'Checked Bag', quantity: 0, weight: 23 },
    { type: 'Extra Baggage', quantity: 0, weight: 10 }
  ];

  constructor(
    public dialogRef: MatDialogRef<LuggageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { luggage: LuggageItem[] }
  ) {
    if (data.luggage && data.luggage.length > 0) {
      this.luggageOptions = data.luggage;
    }
  }

  saveLuggage(): void {
    // סינון המטענים שבהם יש כמות גדולה מ-0 ושמירתם
    this.dialogRef.close(this.luggageOptions.filter(item => item.quantity > 0));
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
