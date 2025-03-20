export interface Passenger {
  firstName: string;
  lastName: string;
  passportNumber?: string; // הפך לאופציונלי
  selectedSeat?: string;
}
