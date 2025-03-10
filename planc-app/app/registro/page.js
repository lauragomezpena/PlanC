"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../page.module.css";

// Función para registrar usuario
const registerUser = async (userData) => {
  try {
    const response = await fetch("https://das-p2-backend.onrender.com/api/users/register/", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error('Error: ${response.status} - ${errorData}');
    }

    const createdUser = await response.json();
    console.log(createdUser);

    return createdUser;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return null;
  }
};

export default function Registro() {
  const router = useRouter();

  // Datos de comunidades (puedes ampliarlos según necesites)
  const comunidadesData = {
    "Madrid": ["Madrid", "Alcalá de Henares", "Leganés", "Getafe"],
    "Cataluña": ["Barcelona", "Girona", "Tarragona", "Lleida"],
    "Andalucía": ["Sevilla", "Málaga", "Granada", "Córdoba"],
    // ... puedes agregar más comunidades aquí
  };

  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    apellido: "",
    dni: "",
    direccion: "",
    comunidad: "",
    ciudad: "",
    email: "",
    passwd: "",
    repeatPasswd: "",
    imagen: null,
  });
  const [provincias, setProvincias] = useState([]);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {
    setMensajeError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleComunidadChange = (e) => {
    setMensajeError("");
    const selectedCommunity = e.target.value;
    setFormData({ ...formData, comunidad: selectedCommunity, ciudad: "" });
    setProvincias(comunidadesData[selectedCommunity] || []);
  };

  const handleFileChange = (e) => {
    setMensajeError("");
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData({
      usuario: "",
      nombre: "",
      apellido: "",
      dni: "",
      direccion: "",
      comunidad: "",
      ciudad: "",
      email: "",
      passwd: "",
      repeatPasswd: "",
      imagen: null,
    });
    setProvincias([]);
    document.getElementById("UserForm").reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      username: formData.user,
      email: formData.email,
      password: formData.password,
      first_name: formData.name,
      last_name: formData.lastname,
      birth_date: formData.birthdate,
      locality: formData.adress,
      municipality: formData.provincia,
    };

    await registerUser(requestData);
    resetForm();
  };


  return (
<>       <h2>Crear usuario</h2>
        <form id="UserForm" onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="usuario" placeholder="Usuario" onChange={handleChange} required />
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <input type="text" name="apellido" placeholder="Apellidos" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
          <input type="text" name="dni" placeholder="DNI" onChange={handleChange} required />
          <input type="text" name="direccion" placeholder="Dirección" onChange={handleChange} required />

          <select name="comunidad" onChange={handleComunidadChange} required>
            <option value="">Selecciona una comunidad</option>
            {Object.keys(comunidadesData).map((comunidad, index) => (
              <option key={index} value={comunidad}>
                {comunidad}
              </option>
            ))}
          </select>

          <select name="ciudad" onChange={handleChange} required>
            <option value="">Selecciona una ciudad</option>
            {provincias.map((provincia, index) => (
              <option key={index} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>

          <input type="password" name="passwd" placeholder="Contraseña" onChange={handleChange} required />
          <input type="password" name="repeatPasswd" placeholder="Repetir Contraseña" onChange={handleChange} required />
          <input type="file" name="imagen" onChange={handleFileChange} />

          <button type="submit">Crear Usuario</button>
          <button type="button" onClick={resetForm}>Limpiar formulario</button>
        </form>
        {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}
        {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
        <a href="/inicio">Volver a inicio sesión</a>
    </>
  );
}
