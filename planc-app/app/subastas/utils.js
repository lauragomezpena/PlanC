import { BASE_URL} from '../../constants/url.js';
export async function createAuction(token, auctionData) {
    const response = await fetch(`${BASE_URL}/api/auctions/subastas/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(auctionData), 
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error('No se pudo crear la subasta');
    }
}


export async function handleAuction(token, auctionId, method = 'GET', updatedData = null) {
    const response = await fetch(`${BASE_URL}/api/auctions/subastas/${auctionId}/`, {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: method === 'PUT' ? JSON.stringify(updatedData) : null, 
    });

    const data = await response.json();
    if (response.ok) {
        return data; 
    } else {
        throw new Error(`No se pudo completar la operación: ${method}`);
    }
}

export const fetchAuctions = async (params = {}) => {
  const url = new URL(`${BASE_URL}/api/auctions/subastas/`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Error al cargar subastas");
  return await response.json();
};


