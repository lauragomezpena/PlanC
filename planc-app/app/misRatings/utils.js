import {URL} from '../../constants/url.js';

export const obtenerMisRatings = async (token) => {
  try {
    const response = await fetch(`${URL}/api/auctions/misRatings/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'No se pudieron obtener las valoraciones');
    }

    return { success: true, pujas: data }; 
  } catch (error) {
    return { success: false, error: error.message }; 
  }
};

export const obtenerSubasta = async (id) => {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${id}/`);
      if (!response.ok) {
        throw new Error('No se pudo obtener la subasta');
      }
      const data = await response.json();
      return { success: true, subasta: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };