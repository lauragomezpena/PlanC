export const obtenerMisSubastas = async (token) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/misSubastas/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Enviar el token de autenticación
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'No se pudieron obtener las subastas');
    }

    return { success: true, subastas: data }; 
  } catch (error) {
    return { success: false, error: error.message }; 
  }
};
