export type UserRole = 'NORMAL_USER' | 'SYSTEM_ADMIN' | 'STORE_OWNER';

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: UserRole;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  role: UserRole;
}

export interface UserSubmittedRating {
  id: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  store: {
    id: string;
    name: string;
    email: string;
    address: string;
  };
}

export interface UserOwnedStore {
  id: string;
  name: string;
  email: string;
  address: string;
  rating: number | null;
  ratingsCount: number;
}

export interface UserDetails extends User {
  createdAt: string;
  updatedAt?: string;
  ownedStore: UserOwnedStore | null;
  ratings: UserSubmittedRating[];
}
