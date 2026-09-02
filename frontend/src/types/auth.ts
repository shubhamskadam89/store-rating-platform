export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    address: string;
}

export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface AuthUser {
    id: string;
    email: string;
    role: 'NORMAL_USER' | 'SYSTEM_ADMIN' | 'STORE_OWNER';
}