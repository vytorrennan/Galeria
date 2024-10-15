import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function LogoutPage() {
    const { setIsLogged } = useAuth();
    useEffect(() => {
        localStorage.clear();
        setIsLogged(false);
    }, [setIsLogged, Navigate])
    return <Navigate to="/login" />
}

export default LogoutPage;
