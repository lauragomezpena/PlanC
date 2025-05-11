import {URL} from '../../constants/url.js';

export const doLogin = async (username, password) => {
    const response = await fetch(`${URL}/api/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Error al iniciar sesión");
    }
    return data; 
};