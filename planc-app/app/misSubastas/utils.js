import {URL} from '../../constants/url.js';
export const obtenerMisSubastas = async (token) => {
  try {
    const response = await fetch(`${URL}/api/auctions/misSubastas/`, {
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


export const deleteAuction = async (id) => {
  const token = localStorage.getItem("token-jwt");

  const response = await fetch(`${URL}/api/auctions/subastas/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la subasta.");
  }

  return true;
};