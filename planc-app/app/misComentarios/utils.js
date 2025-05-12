import {URL} from '../../constants/url.js';
export const obtenerMisComentarios = async (token) => {
  try {
    const response = await fetch(`${URL}/api/auctions/misComentarios/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Enviar el token de autenticación
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'No se pudieron obtener los comentarios');
    }

    return { success: true, pujas: data }; 
  } catch (error) {
    return { success: false, error: error.message }; 
  }
};