import { useAuth } from "../features/auth/auth-context";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute(): React.JSX.Element {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
