import { createContext, useContext } from 'react';
import type { AuthUser, LoginRequest, RegisterRequest } from '../../types/auth';

export interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
}

export type AuthContextType = AuthContextValue;

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
