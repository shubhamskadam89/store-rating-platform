export interface Store {
  id: string;
  name: string;
  address: string;
  overallRating: number | null;
  myRating: number | null;
}
export interface RatingRequest {
  value: number;
}
