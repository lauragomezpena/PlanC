'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../page.module.css';

export default function EditarCuenta() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    comunidad: '',
    ciudad: '',
    email: '',
    usuario: '',
    passwd: '',
    repeatPasswd: '',
    imagen: null,
  });

  const [comunidades, setComunidades] = useState({});
  const [ciudades, setCiudades] = useState([]);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [usuarioData, setUsuarioData] = useState(null);

  useEffect(() => {
    fetch('/ciudades.json')
      .then((response) => response.json())
      .then((data) => setComunidades(data))
      .catch((error) => console.error('Error cargando ciudades:', error));

    // Cargar los datos del usuario cuando el componente se monta
    const cargarDatosUsuario = async () => {
      try {
        const response = await fetch('https://das-p2-backend.onrender.com/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Suponiendo que se guarda el token en localStorage
          },
        });
        const data = await response.json();
        setUsuarioData(data);
        setFormData({
          nombre: data.first_name,
          apellido: data.last_name,
          dni: data.dni,
          direccion: data.address,
          comunidad: data.municipality,
          ciudad: data.locality,
          email: data.email,
          usuario: data.username,
          passwd: '',
          repeatPasswd: '',
          imagen: null, // Aquí podrías cargar la imagen si existe
        });
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    cargarDatosUsuario();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Limpiar el mensaje de error al cambiar cualquier campo
    setMensajeError('');
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleFileChange = (e) => {
    // Limpiar el mensaje de error al cambiar el archivo de imagen
    setMensajeError('');
    setFormData((prevState) => ({ ...prevState, imagen: e.target.files[0] }));
  };

  const handleComunidadChange = (e) => {
    const comunidadSeleccionada = e.target.value;
    // Limpiar el mensaje de error al cambiar la comunidad
    setMensajeError('');
    setFormData((prevState) => ({ ...prevState, comunidad: comunidadSeleccionada }));
    setCiudades(comunidades[comunidadSeleccionada] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de contraseña
    if (formData.passwd && formData.passwd !== formData.repeatPasswd) {
      setMensajeError('Las contraseñas no coinciden');
      return;
    }

    // Validación de campos vacíos
    const requiredFields = [
      'nombre',
      'apellido',
      'dni',
      'direccion',
      'comunidad',
      'ciudad',
      'email',
      'usuario',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setMensajeError(`El campo ${field} es obligatorio`);
        return;
      }
    }

    const payload = {
      username: formData.usuario,
      email: formData.email,
      first_name: formData.nombre,
      last_name: formData.apellido,
      locality: formData.ciudad,
      municipality: formData.comunidad,
      password: formData.passwd || undefined, // Solo enviar la contraseña si fue cambiada
    };

    try {
      const response = await fetch('https://das-p2-backend.onrender.com/api/users/update/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar los datos.');
      }

      setMensajeExito('Datos actualizados con éxito');
      setTimeout(() => router.push('/inicio'), 2000); // Redirige tras 2 segundos
    } catch (error) {
      setMensajeError(error.message);
    }
  };

  if (!usuarioData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1>Editar cuenta</h1>
        <form onSubmit={handleSubmit} id="editar-cuenta" className={styles.form}>
          <label htmlFor="nombre" className={styles.label}>Nombre</label>
          <input
            id="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="apellido" className={styles.label}>Apellido</label>
          <input
            id="apellido"
            type="text"
            value={formData.apellido}
            onChange={handleChange}
            required
          />

          <label htmlFor="dni" className={styles.label}>DNI</label>
          <input
            id="dni"
            type="text"
            value={formData.dni}
            onChange={handleChange}
            required
          />

          <label htmlFor="direccion" className={styles.label}>Dirección</label>
          <input
            id="direccion"
            type="text"
            value={formData.direccion}
            onChange={handleChange}
            required
          />

          <label htmlFor="comunidad" className={styles.label}>Comunidad</label>
          <select
            id="comunidad"
            value={formData.comunidad}
            onChange={handleComunidadChange}
            required
          >
            <option value="">Selecciona una comunidad</option>
            {Object.keys(comunidades).map((comunidad) => (
              <option key={comunidad} value={comunidad}>
                {comunidad}
              </option>
            ))}
          </select>

          <label htmlFor="ciudad" className={styles.label}>Ciudad</label>
          <select
            id="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una ciudad</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>

          <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="usuario" className={styles.label}>Usuario</label>
          <input
            id="usuario"
            type="text"
            value={formData.usuario}
            onChange={handleChange}
            required
          />

          <label htmlFor="passwd" className={styles.label}>Contraseña</label>
          <input
            id="passwd"
            type="password"
            value={formData.passwd}
            onChange={handleChange}
          />

          <label htmlFor="repeatPasswd" className={styles.label}>Repetir contraseña</label>
          <input
            id="repeatPasswd"
            type="password"
            value={formData.repeatPasswd}
            onChange={handleChange}
          />

          <label htmlFor="imagen" className={styles.label}>Imagen</label>
          <input id="imagen" type="file" onChange={handleFileChange} />

          {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
          {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}

          <button className={styles.formButtonSubmit} type="submit">Actualizar</button>

          <div className={styles.formButtons}>
            <button className={styles.formButton} type="reset">Limpiar Formulario</button>
            <button
              className={styles.formButton}
              type="button"
              onClick={() => router.push('/inicio')}
            >
              Volver a la Página de Inicio
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
