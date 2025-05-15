"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { fetchCategories, fetchAuctionById, updateAuction, deleteAuction } from "./utils";
import { useParams, useRouter } from "next/navigation";

export default function EditAuctionForm() {
  const router = useRouter();
  const { id: auctionId } = useParams();
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    closing_date: "",
    starting_price: "",
    stock: "",
    category: "",
    brand: "",
    image: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, auction] = await Promise.all([
          fetchCategories(),
          fetchAuctionById(auctionId),
        ]);

        setCategories(cats);

        const formattedDate = new Date(auction.closing_date)
          .toISOString()
          .split("T")[0];

        setFormData({
          title: auction.title,
          description: auction.description,
          closing_date: formattedDate,
          starting_price: auction.starting_price,
          stock: auction.stock,
          category: auction.category,
          brand: auction.brand,
          image: null,
        });

        setImagePreview(auction.image);
      } catch (error) {
        console.error("Error cargando datos:", error);
        alert("No se pudo cargar la subasta.");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [auctionId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const closingDate = new Date(formData.closing_date);
      closingDate.setHours(23, 59, 0);

      const updatedData = {
        ...formData,
        category: parseInt(formData.category), // asegúrate que sea número
        closing_date: closingDate.toISOString(),
      };

      await updateAuction(auctionId, updatedData);

      alert("Subasta actualizada correctamente.");
      router.push("/");
    } catch (error) {
      console.error("Error al actualizar la subasta:", error);
      setErrorMsg("No se pudo actualizar la subasta. Revisa los campos.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta subasta?");
    if (!confirm) return;

    try {
      await deleteAuction(auctionId);
      alert("Subasta eliminada correctamente.");
      router.push("/");
    } catch (error) {
      console.error("Error al eliminar subasta:", error);
      alert("No se pudo eliminar la subasta.");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Editar Subasta</h2>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <label htmlFor="title" className={styles.label}>Título</label>
      <input name="title" value={formData.title} onChange={handleChange} className={styles.input} required />

      <label htmlFor="description" className={styles.label}>Descripción</label>
      <textarea name="description" value={formData.description} onChange={handleChange} className={styles.input} required />

      <label htmlFor="closing_date" className={styles.label}>Fecha de cierre</label>
      <input type="date" name="closing_date" value={formData.closing_date} onChange={handleChange} className={styles.input} required />

      <label htmlFor="starting_price" className={styles.label}>Precio de salida</label>
      <input type="number" step="0.01" name="starting_price" value={formData.starting_price} onChange={handleChange} className={styles.input} required />

      <label htmlFor="stock" className={styles.label}>Stock</label>
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} className={styles.input} required />

      <label htmlFor="category" className={styles.label}>Categoría</label>
      <select name="category" value={formData.category} onChange={handleChange} className={styles.input} required>
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <label htmlFor="brand" className={styles.label}>Marca</label>
      <input name="brand" value={formData.brand} onChange={handleChange} className={styles.input} required />

      <label htmlFor="image" className={styles.label}>Imagen</label>
      <input type="file" name="image" accept="image/*" onChange={handleChange} className={styles.input} />

      {imagePreview && <img src={imagePreview} alt="Vista previa" className={styles.previewImage} />}

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.formButtonSubmit}>Confirmar cambios</button>
        <button type="button" onClick={handleDelete} className={styles.formButtonDelete}>Eliminar subasta</button>
      </div>
    </form>
  );
}
