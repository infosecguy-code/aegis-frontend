export default function DashboardPage() {
    return <div>Selamat datang di Aegis Dashboard</div>;
}


// ===== src/App.tsx =====
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import LoginPage from './pages/Login';
import ChangePasswordPage from './pages/ChangePassword';
import DashboardPage from './pages/Dashboard';
import { PrivateRoute, ForceChangePasswordRoute } from './routes/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/change-password"
                    element={
                        <ForceChangePasswordRoute>
                            <ChangePasswordPage />
                        </ForceChangePasswordRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
