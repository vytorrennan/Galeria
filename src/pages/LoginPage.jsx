import { Navigate } from "react-router-dom"
import Form from "../components/Form"
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
    const { isLogged } = useAuth();
    return isLogged ? <Navigate to="/" /> : <Form method="login" />
}

export default LoginPage;
