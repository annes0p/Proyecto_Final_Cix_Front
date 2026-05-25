import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedAccessToken = localStorage.getItem("accessToken");
        const savedRefreshToken = localStorage.getItem("refreshToken");

        if (savedUser && savedAccessToken && savedRefreshToken) {
            setUser(JSON.parse(savedUser));
            setAccessToken(savedAccessToken);
            setRefreshToken(savedRefreshToken);
        }

        setLoading(false);
    }, []);

    const login = (user, accessToken, refreshToken) => {

        setUser(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        console.log(localStorage.getItem("user"));
        console.log(localStorage.getItem("accessToken"));
        console.log(localStorage.getItem("refreshToken"));
    };

    return (
        <AuthContext.Provider
            value={{ user, accessToken, refreshToken, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};