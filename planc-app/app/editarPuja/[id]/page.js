"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { fetchBidbyId, updateBid, deleteBid } from "./utils";
import { useParams, useRouter } from "next/navigation";

export default function EditBid() {
  const router = useRouter();
  const { id: bidId } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ price: "" });
  const [originalPrice, setOriginalPrice] = useState(null);
  const [auctionTitle, setAuctionTitle] = useState("");
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);

  useEffect(() => {
    const loadBid = async () => {
      try {
        const bid = await fetchBidbyId(bidId);

        setFormData({ price: bid.price });
        setOriginalPrice(bid.price);
        setAuctionTitle(bid.title);

        // Verificar si la subasta aún no ha cerrado
        const closingDate = new Date(bid.closing_date);
        const now = new Date();
        setIsAuctionOpen(closingDate > now);
      } catch (error) {
        console.error("Error cargando puja:", error);
        alert("No se pudo cargar la puja.");
        router.push("/misPujas");
      } finally {
        setLoading(false);
      }
    };

    loadBid();
  }, [bidId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPrice = parseFloat(formData.price);
    if (newPrice <= originalPrice) {
      alert("Solo puedes aumentar el precio de tu puja.");
      return;
    }

    try {
      await updateBid(bidId, { price: newPrice });
      alert("Puja actualizada correctamente.");
      router.push("/misPujas");
    } catch (error) {
      console.error("Error al actualizar la puja:", error);
      alert("No se pudo actualizar la puja.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta puja?");
    if (!confirm) return;

    try {
      await deleteBid(bidId);
      alert("Puja eliminada correctamente.");
      router.push("/misPujas");
    } catch (error) {
      console.error("Error al eliminar puja:", error);
      alert("No se pudo eliminar la puja.");
    }
  };

  if (loading) return <p>Cargando puja...</p>;

  if (!isAuctionOpen) {
    return (
      <div className={styles.form}>
        <h2>La subasta <strong>{auctionTitle}</strong> ya ha finalizado.</h2>
        <p>No puedes modificar esta puja.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Editando puja en: <strong>{auctionTitle}</strong></h2>

      <label htmlFor="price" className={styles.label}>Nuevo precio</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.formButtonSubmit}>Guardar cambios</button>
        <button type="button" onClick={handleDelete} className={styles.formButtonDelete}>Eliminar puja</button>
      </div>
    </form>
  );
}
