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
