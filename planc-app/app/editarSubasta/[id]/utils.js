import { URL } from "@/constants/url";

// Obtener subasta por ID
export const fetchAuctionById = async (id) => {
  const token = localStorage.getItem("token-jwt");
  const response = await fetch(`${URL}/api/auctions/subastas/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo cargar la subasta.");
  }

  return response.json();
};

// Actualizar subasta
export const updateAuction = async (id, formData) => {
  const token = localStorage.getItem("token-jwt");
  const payload = new FormData();

  for (const key in formData) {
    const value = formData[key];

    // Evitar enviar 'image' si no hay archivo nuevo
    if (key === "image" && !value) continue;

    // Solo añadir si no es null ni undefined
    if (value !== null && value !== undefined) {
      payload.append(key, value);
    }
  }

  const response = await fetch(`${URL}/api/auctions/subastas/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      // No pongas "Content-Type" con FormData
    },
    body: payload,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor al actualizar subasta:", errorText);
    throw new Error("Error al actualizar la subasta.");
  }

  return response.json();
};

// Eliminar subasta
export const deleteAuction = async (id) => {
  const token = localStorage.getItem("token-jwt");

  const response = await fetch(`${URL}/api/auctions/subastas/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al eliminar la subasta:", errorText);
    throw new Error("Error al eliminar la subasta.");
  }

  return true;
};

// Obtener lista de categorías
export async function fetchCategories() {
  const res = await fetch(`${URL}/api/auctions/categorias/`);
  if (!res.ok) {
    throw new Error("No se pudieron cargar las categorías");
  }
  return res.json();
}
