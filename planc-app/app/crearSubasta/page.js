"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { createAuction, fetchCategories } from "./utils";


export default function NewAuctionForm() {
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    closing_date: "",
    starting_price: "",
    stock: "",
    rating: "",
    category: "",
    brand: "",
    image: null,
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    loadCategories();
  }, []);

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
      const closingDate = new Date(formData.closing_date);
      closingDate.setHours(23, 59, 0);

      const updatedData = {
        ...formData,
        closing_date: closingDate.toISOString(),
      };

      await createAuction(updatedData);

      alert("Subasta creada correctamente.");
      setFormData({
        title: "",
        description: "",
        closing_date: "",
        starting_price: "",
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

      <label htmlFor="closing_date" className={styles.label}>Fecha de cierre</label>
      <input type="date" name="closing_date" value={formData.closing_date} onChange={handleChange} className={styles.input} required />

      <label htmlFor="starting_price" className={styles.label}>Precio de salida</label>
      <input type="number" step="0.01" name="starting_price" value={formData.starting_price} onChange={handleChange} className={styles.input} required />

      <label htmlFor="stock" className={styles.label}>Stock</label>
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} className={styles.input} required />

      <label htmlFor="rating" className={styles.label}>Valoración (1-5)</label>
      <input type="number" min="1" max="5" step="1" name="rating" value={formData.rating} onChange={handleChange} className={styles.input} required />

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
      <input type="file" name="image" accept="image/*" onChange={handleChange} className={styles.input} required />

      {imagePreview && <img src={imagePreview} alt="Preview" className={styles.previewImage} />}

      <button type="submit" className={styles.formButtonSubmit}>Crear subasta</button>
    </form>
  );
}
