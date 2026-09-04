import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/login-page';
import { RegisterPage } from './pages/register-page';
import { DashboardPage } from './pages/dashboard-page';
import { StoresPage } from './pages/stores-page';
import { AdminUsersPage } from './pages/admin-users-page';
import { AdminStoresPage } from './pages/admin-stores-page';
import { OwnerDashboardPage } from './pages/owner-dashboard-page';
import { ProtectedRoute } from './routes/protected-route';
import { AppLayout } from './components/layout/app-layout';
import { RoleRoute } from './routes/role-route';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route element={<RoleRoute allowedRoles={['NORMAL_USER']} />}>
              <Route path="/stores" element={<StoresPage />} />
            </Route>

            <Route element={<RoleRoute allowedRoles={['SYSTEM_ADMIN']} />}>
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/stores" element={<AdminStoresPage />} />
            </Route>

            <Route element={<RoleRoute allowedRoles={['STORE_OWNER']} />}>
              <Route path="/owner" element={<OwnerDashboardPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
