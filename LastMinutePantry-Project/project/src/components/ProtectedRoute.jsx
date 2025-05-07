import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to the appropriate auth page based on the current path
    const role = location.pathname.split('/')[1]; // Extract role from path
    return <Navigate to={`/${role}/auth`} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to role selection if user's role doesn't match
    return <Navigate to="/role-selection" replace />;
  }

  return children;
}