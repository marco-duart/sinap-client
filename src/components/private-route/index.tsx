import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { ProcessingScreen } from "../processing-screen";

interface PrivateRouteProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <ProcessingScreen message="Verificando autenticação..." />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};
