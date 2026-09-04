import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth';
import { NotificationProvider } from './features/notifications';
import { LoginPage } from './pages/login-page';
import { RegisterPage } from './pages/register-page';
import { LandingPage } from './pages/landing-page';
import { DashboardPage } from './pages/dashboard-page';
import { StoresPage } from './pages/stores-page';
import { AdminUsersPage } from './pages/admin-users-page';
import { AdminUserDetailsPage } from './pages/admin-user-details-page';
import { AdminStoresPage } from './pages/admin-stores-page';
import { UpdatePasswordPage } from './pages/update-password-page';
import { ProtectedRoute } from './routes/protected-route';
import { AppLayout } from './components/layout/app-layout';
import { RoleRoute } from './routes/role-route';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/update-password" element={<UpdatePasswordPage />} />

                <Route element={<RoleRoute allowedRoles={['NORMAL_USER']} />}>
                  <Route path="/stores" element={<StoresPage />} />
                </Route>

                <Route element={<RoleRoute allowedRoles={['SYSTEM_ADMIN']} />}>
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/users/:id" element={<AdminUserDetailsPage />} />
                  <Route path="/admin/stores" element={<AdminStoresPage />} />
                </Route>

                <Route element={<RoleRoute allowedRoles={['STORE_OWNER']} />}>
                  <Route path="/owner" element={<Navigate to="/dashboard" replace />} />
                </Route>
              </Route>
            </Route>

            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
