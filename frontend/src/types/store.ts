export interface Store {
  id: string;
  name: string;
  address: string;
  overallRating: number | null;
  myRating: number | null;
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
