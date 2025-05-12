import { BASE_URL} from '../../constants/url.js';
export async function createAuction(token, auctionData) {
    const response = await fetch(`${BASE_URL}/api/auctions/subastas/`, {
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
    const response = await fetch(`${BASE_URL}/api/auctions/subastas/${auctionId}/`, {
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


// export const fetchAuctions= async (query = '')=> {
//   const url = query
//     ? `${URL}/api/auctions/subastas/?search=${encodeURIComponent(query)}`
//     : `${URL}/api/auctions/subastas/`;

//   const response = await fetch(url);
//   if (!response.ok) throw new Error("Error al cargar subastas");
//   return await response.json();
// }

export const fetchAuctions = async (params = {}) => {
  const url = new URL(`${BASE_URL}/api/auctions/subastas/`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Error al cargar subastas");
  return await response.json();
};


