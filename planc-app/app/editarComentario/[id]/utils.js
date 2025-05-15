import {URL} from '../../../constants/url.js';

export async function modificarComentario({ token, auctionId, comentarioId, title, text }) {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/comentarios/${comentarioId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, text }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.detail || 'Error al cambiar comentario');
      }
  
      return { success: true, comentario: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }


export const obtenerComentarios = async (auctionId, token) => {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/comentarios/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'No se pudieron obtener los comentarios');
      }
  
      return { success: true, comentarios: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

export async function obtenerComentario({ token, comentarioId, auctionId }) {
  try {
    const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/comentarios/${comentarioId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Error al obtener comentario');
    }

    return { success: true, comentario: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


    
  // SUBASTA
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
