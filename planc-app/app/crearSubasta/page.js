"use client";

import { useState } from "react";
import styles from "./page.module.css"; // Importa el CSS Module
import { createAuction } from "./utils"; // Importa la función de utilidades

export default function NewAuctionForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    closingDate: "",
    creationDate: "",
    startingPrice: "",
    stock: "",
    rating: "",
    category: "",
    brand: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

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

    try {
      await createAuction(formData); // Usamos la función de utils.js

      alert("Subasta creada correctamente.");
      setFormData({
        title: "",
        description: "",
        closingDate: "",
        creationDate: "",
        startingPrice: "",
        stock: "",
        rating: "",
        category: "",
        brand: "",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error al crear subasta:", error);
      alert("Error al crear la subasta.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="title" className={styles.label}>Título</label>
      <input name="title" value={formData.title} onChange={handleChange} className={styles.input} required />
      <label htmlFor="description" className={styles.label}>Descripción</label>
      <textarea name="description" value={formData.description} onChange={handleChange} className={styles.input} required />
      <label htmlFor="closingDate" className={styles.label}>Fecha de cierre</label>
      <input type="date" name="closingDate" value={formData.closingDate} onChange={handleChange} className={styles.input} required />
      <label htmlFor="creationDate" className={styles.label}>Fecha de creación</label>
      <input type="date" name="creationDate" value={formData.creationDate} onChange={handleChange} className={styles.input} required />
      <label htmlFor="startingPrice" className={styles.label}>Precio</label>
      <input type="number" step="0.01" name="startingPrice" value={formData.startingPrice} onChange={handleChange} placeholder="Precio de salida" className={styles.input} required />
      <label htmlFor="stock" className={styles.label}>Stock</label>
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className={styles.input} required />
      <label htmlFor="rating" className={styles.label}>Valoración (0-5)</label>
      <input type="number" min="0" max="5" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="Valoración (0-5)" className={styles.input} required />
      <label htmlFor="category" className={styles.label}>Categoría</label>
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Categoría" className={styles.input} required />
      <label htmlFor="brand" className={styles.label}>Marca</label>
      <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Marca" className={styles.input} required />
      <label htmlFor="image" className={styles.label}>Imagen</label>
      <input type="file" name="image" accept="image/*" onChange={handleChange} className={styles.input} required />

      {imagePreview && <img src={imagePreview} alt="Preview" className={styles.previewImage} />}

      <button type="submit" className={styles.formButtonSubmit}>Crear subasta</button>
    </form>
  );
}
