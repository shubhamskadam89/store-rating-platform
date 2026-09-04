import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AuthApi } from '../../api/auth.api';
import type { AuthUser, LoginRequest, RegisterRequest } from '../../types/auth';
import { AuthContext, type AuthContextValue } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  }, []);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const currentUser = await AuthApi.getMe();
      setUser(currentUser);
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    void loadUser();
  }, [loadUser]);

  const login = async (data: LoginRequest) => {
    const response = await AuthApi.login(data);
    localStorage.setItem('accessToken', response.accessToken);

    const currentUser = await AuthApi.getMe();
    setUser(currentUser);
  };

  const register = async (data: RegisterRequest) => {
    await AuthApi.register(data);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
