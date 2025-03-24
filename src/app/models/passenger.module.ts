export interface Passenger {
  firstName: string;
  lastName: string;
  luggage?: { type: string; quantity: number }[]; // הוספת המטען
  passportNumber?: string; // הפך לאופציונלי
  selectedSeat?: string;
}
