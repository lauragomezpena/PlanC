export const createAuction = async (formData) => {
    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auctions/subastas/", {
        method: "POST",
        body: payload,
      });
  
      if (!response.ok) {
        throw new Error("Error al crear la subasta.");
      }
  
      return await response.json();  // Deberías devolver la respuesta del servidor si es necesario
    } catch (error) {
      throw error;
    }
  };
  