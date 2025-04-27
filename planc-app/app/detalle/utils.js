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

  export async function crearComentario({ token, auctionId, title, text }) {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/comentarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, text }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.detail || 'Error al crear comentario');
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

  export async function borrarComentario({ token, auctionId, comentarioId }) {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/comentarios/${comentarioId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Error al borrar comentario');
      }
  
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }