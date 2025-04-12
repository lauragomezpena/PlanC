export async function fetchUserProfile(token) {
    const response = await fetch('https://das-p2-backend.onrender.com/api/users/profile/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Usar el token de autenticación
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    if (response.ok) {
        return data; // Datos del perfil del usuario
    } else {
        throw new Error('No se pudo obtener el perfil');
    }
};
  