import {URL} from '../../constants/url.js';
export async function createAuction(token, auctionData) {
    const response = await fetch(`${URL}/api/auctions/subastas/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Token de autenticación
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(auctionData), // Datos de la nueva subasta
    });

    const data = await response.json();
    if (response.ok) {
        return data; // Subasta creada
    } else {
        throw new Error('No se pudo crear la subasta');
    }
}


export async function handleAuction(token, auctionId, method = 'GET', updatedData = null) {
    const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/`, {
        method: method, // 'GET', 'PUT' o 'DELETE'
        headers: {
            'Authorization': `Bearer ${token}`, // Token de autenticación
            'Content-Type': 'application/json',
        },
        body: method === 'PUT' ? JSON.stringify(updatedData) : null, // Solo enviar body si es 'PUT'
    });

    const data = await response.json();
    if (response.ok) {
        return data; // Resultado de la operación
    } else {
        throw new Error(`No se pudo completar la operación: ${method}`);
    }
}

export const fetchAuctions = async () => {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/`);
      if (!response.ok) throw new Error('Error al obtener subastas');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en fetchAuctions:", error);
      return [];
    }
  };



// Obtener la valoración promedio de una subasta
export const fetchAverageRating = async (auctionId) => {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/`);
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
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/ratings/`, {
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
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/ratings/user/`, {
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
      return data.rating; // Asegúrate de que el backend devuelva el campo `rating`
    } catch (error) {
      console.error("Error en fetchUserRating:", error);
      throw error;
    }
  };
  
  // Eliminar la valoración del usuario para una subasta
  export const deleteUserRating = async (auctionId, token) => {
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/${auctionId}/ratings/user/`, {
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