'use state';
import {URL} from "@/constants/url";

export async function fetchCategories() {
    const res = await fetch(`${URL}/api/auctions/categorias/`);
    if (!res.ok) {
      throw new Error("No se pudieron cargar las categorías");
    }
    return res.json();
  }