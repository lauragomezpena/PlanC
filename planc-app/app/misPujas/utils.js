export const obtenerMisPujas = async (token) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/misPujas/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Enviar el token de autenticación
      },
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


export const deleteBid = async (id) => {
  const token = localStorage.getItem("token-jwt");

  const response = await fetch(`http://127.0.0.1:8000/api/auctions/pujas/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la puja.");
  }

  return true;
};