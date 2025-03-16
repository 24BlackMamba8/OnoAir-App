import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flight } from 'src/app/models/flight.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-flight',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent {
  updatedFlight: Flight; // משתנה זה יאוחסן את הנתונים המעודכנים

  constructor(
    public dialogRef: MatDialogRef<EditFlightComponent>, // Dialog reference
    @Inject(MAT_DIALOG_DATA) public flight: Flight // Injecting flight data
  ) {
    // יצירת עותק לשינוי, כך שהשינויים לא יפגעו במידע המקורי
    this.updatedFlight = { ...flight };
  }

  onSave() {
    // כאשר נשמור את הנתונים המעודכנים, נשלח אותם חזרה לקומפוננטה הקוראת
    this.dialogRef.close(this.updatedFlight);
  }

  onCancel(): void {
    // אם המשתמש בחר לבטל, נסגור את הדיאלוג בלי לשלוח נתונים
    this.dialogRef.close();
  }
}
