
import { useLocation, Navigate, Outlet, replace } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

function RequireAuth({ allowedRoles }) {
    const location = useLocation();
    const { roles, isManager, isAdmin } = useAuth();

    return (
        roles.some(role => allowedRoles.includes(role)) ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;