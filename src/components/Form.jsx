import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Form({ method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setIsLogged } = useAuth();

    const name = method === "login" ? "Login" : "Register";
    const reverseName = method === "login" ? "Register" : "Login";
    const reverseUrl = method === "login" ? "/register" : "/login"

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (method === "login") {
                const res = await fetch("/api/contas");
                const contas = await res.json();
                contas.map((conta) => {
                    if (conta.nome == username && conta.senha == password) {
                        localStorage.setItem("USERNAME", username);
                        localStorage.setItem("PASSWORD", password);
                        setIsLogged(true);
                        navigate("/");
                        return;
                    }
                })
            } else if (method === "register") {
                const novaConta = { nome: username, senha: password }
                const resp = await fetch("/api/contas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(novaConta),
                });
                navigate("/login")
                return;
            }
        } catch (error) {
            alert(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <div className="d-flex flex-column gap-3 mb-3">
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            <button className="form-button btn btn-primary mb-2" type="submit">
                {name}
            </button>
            <a href={reverseUrl} className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover mt-5">Go to {reverseName}</a>
        </form>
    );
};

export default Form;
