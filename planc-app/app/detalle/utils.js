import {URL} from '../../constants/url.js';
import { BASE_URL } from '../../constants/url.js';

// PUJA 
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

   export const obtenerPujas = async (auctionId) => {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/pujas/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
  
  
  // SUBASTA
  export const obtenerSubasta = async (id) => {
    try {
      console.log('OBTENER SUBASTA')
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

 
// COMENTARIO
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
  
  export const obtenerComentarios = async (auctionId) => {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/comentarios/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

// RATINGS 

export const fetchAverageRating = async (auctionId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auctions/subastas/${auctionId}/`);
      if (!response.ok) {
        throw new Error("Error al obtener la valoración promedio");
      }
      const data = await response.json();
      return data.average_rating;
    } catch (error) {
      console.error("Error en fetchAverageRating:", error);
      throw error;
    }
  };


  
  // Enviar una valoración para una subasta
  export const sendRating = async (auctionId, value, token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auctions/subastas/${auctionId}/ratings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Error al enviar la valoración");
      }
  
      return { success: true };
    } catch (error) {
      console.error("Error en sendRating:", error);
      throw error;
    }
  };


// Obtener la valoración del usuario para una subasta
export const fetchUserRating = async (auctionId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auctions/subastas/${auctionId}/ratings/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          return null; // El usuario no ha valorado la subasta
        }
        throw new Error("Error al obtener la valoración del usuario");
      }
  
      const data = await response.json();
      return data.rating; 
    } catch (error) {
      console.error("Error en fetchUserRating:", error);
      throw error;
    }
  };
  
  // Eliminar la valoración del usuario para una subasta
  export const deleteUserRating = async (auctionId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auctions/subastas/${auctionId}/ratings/user/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al eliminar la valoración");
      }
  
      return { success: true };
    } catch (error) {
      console.error("Error en deleteUserRating:", error);
      throw error;
    }
  };

export default deleteUserRating