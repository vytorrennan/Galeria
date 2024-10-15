import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
    const { isLogged } = useAuth();
    return isLogged ? children : <Navigate to="/login" />
}

export default ProtectedRoute;
