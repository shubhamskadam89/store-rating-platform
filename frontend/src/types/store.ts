export interface StoreRating {
  id?: string;
  userId: string;
  userName: string;
  value: number;
  createdAt?: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  overallRating: number | null;
  ratingCount?: number;
  myRating: number | null;
  recentRatings?: StoreRating[];
  email?: string;
  rating?: number | null;
}

export interface AdminStore {
  id: string;
  name: string;
  email: string;
  address: string;
  rating: number | null;
  owner?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface RatingRequest {
  value: number;
}

export interface CreateStoreRequest {
  name: string;
  email: string;
  address: string;
  ownerId?: string;
}
