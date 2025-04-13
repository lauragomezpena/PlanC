
import {URL} from '../../constants/url.js';
export const createAuction = async (formData) => {
    const token = localStorage.getItem("token-jwt");
    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }
  
    try {
      const response = await fetch(`${URL}/api/auctions/subastas/`, {
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`, 
        },
  
      });
  
      if (!response.ok) {
        throw new Error("Error al crear la subasta.");
      }
  
      return await response.json();  // Deberías devolver la respuesta del servidor si es necesario
    } catch (error) {
      throw error;
    }
  };


export async function fetchCategories() {
    const res = await fetch(`${URL}/api/auctions/categorias/`);
    if (!res.ok) {
      throw new Error("No se pudieron cargar las categorías");
    }
    return res.json();
  }
  
  