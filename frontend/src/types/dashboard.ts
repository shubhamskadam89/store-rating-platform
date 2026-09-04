export interface AdminStats {
  users: number;
  stores: number;
  ratings: number;
}

export interface OwnerStoreRating {
  id: string;
  value: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface OwnerDashboardData {
  store: {
    id: string;
    name: string;
    email: string;
    address: string;
  };
  averageRating: number | null;
  totalRatings: number;
  ratings: OwnerStoreRating[];
}
