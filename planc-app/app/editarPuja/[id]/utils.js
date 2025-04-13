
export const fetchBidbyId = async (id) => {
  const token = localStorage.getItem("token-jwt");
  const response = await fetch(`http://127.0.0.1:8000/api/auctions/pujas/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo cargar la puja.");
  }

  return response.json();
};

export const updateBid = async (id, formData) => {
  const token = localStorage.getItem("token-jwt");
  const payload = new FormData();
  for (const key in formData) {
    payload.append(key, formData[key]);
  }

  const response = await fetch(`http://127.0.0.1:8000/api/auctions/pujas/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la puja.");
  }

  return response.json();
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

