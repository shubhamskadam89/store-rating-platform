
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { LoginPage } from './pages/login-page';
import { RegisterPage } from './pages/register-page';
import { DashboardPage } from './pages/dashboard-page';
import { ProtectedRoute } from './routes/protected-route';
import { Routes, Navigate } from 'react-router';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>



    </BrowserRouter>

  );
}

export default App;
