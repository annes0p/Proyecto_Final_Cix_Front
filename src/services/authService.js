import api from "./api";

export const login = async (identifier, password) => {
    try {
        const response = await api.post("/auth/login", {
            identifier,
            password,
        });

        console.log("Respuesta del login:", response.data);

        const token = response.data.data?.auth?.accessToken;

        if (token) {
            localStorage.setItem("token", token);
        }

        return response.data;
    } catch (error) {
        console.error("Error en el servicio de autenticación:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};