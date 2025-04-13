import {URL} from '../../constants/url.js';
export async function crearPuja({ token, auctionId, price }) {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/pujas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ price }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la puja');
      }
  
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
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

  export const obtenerPujas = async (auctionId, token) => {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/pujas/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'No se pudieron obtener las pujas');
      }
  
      return { success: true, pujas: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };