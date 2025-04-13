export const fetchAuctionById = async (id) => {
  const token = localStorage.getItem("token-jwt");
  const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo cargar la subasta.");
  }

  return response.json();
};

export const updateAuction = async (id, formData) => {
  const token = localStorage.getItem("token-jwt");
  const payload = new FormData();
  for (const key in formData) {
    payload.append(key, formData[key]);
  }

  const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la subasta.");
  }

  return response.json();
};


export const deleteAuction = async (id) => {
  const token = localStorage.getItem("token-jwt");

  const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la subasta.");
  }

  return true;
};

export async function fetchCategories() {
  const res = await fetch("http://localhost:8000/api/auctions/categorias/");
  if (!res.ok) {
    throw new Error("No se pudieron cargar las categorías");
  }
  return res.json();
}

