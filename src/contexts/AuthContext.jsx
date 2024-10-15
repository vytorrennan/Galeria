import { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto de autenticação
const AuthContext = createContext();

// Hook para usar o contexto facilmente em qualquer componente
export const useAuth = () => useContext(AuthContext);

// Componente que envolve a aplicação e provê o estado de autenticação
export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem("USERNAME");
        const password = localStorage.getItem("PASSWORD");
        if (username && password) {
            setIsLogged(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

