import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flight } from 'src/app/models/flight.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-flight-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent {
  updatedFlight: Flight; // משתנה זה יאוחסן את הנתונים המעודכנים

  constructor(
    public dialogRef: MatDialogRef<EditFlightComponent>, // גישה לדיאלוג עצמו
    @Inject(MAT_DIALOG_DATA) public flight: Flight // הזרקה של פרטי הטיסה
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
