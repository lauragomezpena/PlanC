export async function createAuction(token, auctionData) {
    const response = await fetch('http://127.0.0.1:8000/api/auctions/subastas/', {
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
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${auctionId}/`, {
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
      const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/`);
      if (!response.ok) throw new Error('Error al obtener subastas');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en fetchAuctions:", error);
      return [];
    }
  };