'use client';
import styles from "../../app/page.module.css";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../utils/auth';
const comunidades = {
  "Andalucía": ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"],
  "Aragón": ["Huesca", "Teruel", "Zaragoza"],
  "Asturias": ["Oviedo", "Gijón", "Avilés"],
  "Canarias": ["Las Palmas", "Santa Cruz de Tenerife"],
  "Cantabria": ["Santander"],
  "Castilla-La Mancha": ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"],
  "Castilla y León": ["Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"],
  "Cataluña": ["Barcelona", "Girona", "Lleida", "Tarragona"],
  "Extremadura": ["Badajoz", "Cáceres"],
  "Galicia": ["A Coruña", "Lugo", "Ourense", "Pontevedra"],
  "Madrid": ["Madrid"],
  "Murcia": ["Murcia"],
  "Navarra": ["Pamplona"],
  "La Rioja": ["Logroño"],
  "País Vasco": ["Bilbao", "San Sebastián", "Vitoria"],
  "Valencia": ["Alicante", "Castellón", "Valencia"]
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    locality: '',
    municipality: ''
  });
  
  const [ciudades, setCiudades] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { register } = useAuth();

  const handleComunidadChange = (e) => {
    const comunidadSeleccionada = e.target.value;
    setFormData((prevState) => ({ 
      ...prevState, 
      locality: comunidadSeleccionada,
      municipality: '' 
    }));
    setCiudades(comunidades[comunidadSeleccionada] || []);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validatePassword = (password) => {
    // Al menos 8 caracteres y contener letras y números
    const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regEx.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones locales
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (!validatePassword(formData.password)) {
      setError('La contraseña debe tener al menos 8 caracteres y contener letras y números');
      return;
    }
    
    // Eliminar confirmPassword antes de enviar
    const userData = {...formData};
    delete userData.confirmPassword;

    // Asegurarnos que birth_date tiene el formato correcto (YYYY-MM-DD)
    if (userData.birth_date) {
      const date = new Date(userData.birth_date);
      if (isNaN(date.getTime())) {
        setError('Fecha de nacimiento inválida');
        return;
      }
      userData.birth_date = date.toISOString().split('T')[0];
    }

    try {
      setError('');
      setLoading(true);
      console.log('Enviando datos de registro:', userData);
      
      // Aquí simulamos la llamada a la API
      const response = await fetch('https://das-p2-backend.onrender.com/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      // Obtener la respuesta
      const responseText = await response.text();
      
      if (!response.ok) {
        // Procesar errores de la API
        try {
          const errorData = JSON.parse(responseText);
          const errorMessages = [];
          
          // Recorrer los errores y traducirlos
          Object.entries(errorData).forEach(([field, messages]) => {
            const fieldName = getFieldDisplayName(field);
            if (Array.isArray(messages)) {
              messages.forEach(message => {
                errorMessages.push(`${fieldName}: ${translateErrorMessage(message)}`);
              });
            } else if (typeof messages === 'string') {
              errorMessages.push(`${fieldName}: ${translateErrorMessage(messages)}`);
            }
          });
          
          setError(errorMessages.join('\n'));
        } catch (e) {
          // Si no es JSON, mostrar el texto tal cual
          setError(`Error en el registro: ${responseText}`);
        }
        return;
      }
      
      // Registro exitoso
      setSuccess('Registro exitoso. Ya puedes iniciar sesión.');
      setTimeout(() => {
        router.push('/inicio');
      }, 2000);
    } catch (error) {
      console.error('Error durante el registro:', error);
      setError('Error de conexión. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  // Función para obtener nombre legible de los campos
  const getFieldDisplayName = (field) => {
    const fieldNames = {
      username: 'Nombre de usuario',
      email: 'Email',
      password: 'Contraseña',
      first_name: 'Nombre',
      last_name: 'Apellidos',
      birth_date: 'Fecha de nacimiento',
      locality: 'Localidad',
      municipality: 'Municipio'
    };
    
    return fieldNames[field] || field;
  };
  
  // Función para traducir mensajes de error comunes
  const translateErrorMessage = (message) => {
    const translations = {
      'A user with that username already exists.': 'Este nombre de usuario ya está en uso',
      'Enter a valid email address.': 'Introduce una dirección de email válida',
      'This field may not be blank.': 'Este campo no puede estar vacío',
      'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.': 'El formato de fecha debe ser AAAA-MM-DD',
      'This password is too common.': 'Esta contraseña es demasiado común',
      'This password is too short. It must contain at least 8 characters.': 'La contraseña es demasiado corta. Debe tener al menos 8 caracteres',
      "A user with that email already exists.": "Ya existe un usuario con ese email"
    };
    
    return translations[message] || message;
  };

  return (
    <div>
      
      <h1>Regístrate en Plan C</h1>
        <br />
      <h2>Si ya tienes cuenta, Inicia Sesión</h2>

        
        {error && (
          <div className={styles.error}>
            {error.split('\n').map((line, index) => (
              <div key={index} className={styles.errorLine}>{line}</div>
            ))}
          </div>
        )}
        {success && <div className={styles.success}>{success}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>

              <label htmlFor="username" className={styles.label}>Nombre de usuario*</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Elige un nombre de usuario único"
              />

            
              <label htmlFor="email" className={styles.label}>Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ejemplo@correo.com"
              />

              <label htmlFor="password" className={styles.label}>Contraseña*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Mínimo 8 caracteres, letras y números"
              />

            

              <label htmlFor="confirmPassword" className={styles.label}>Confirmar contraseña*</label>
              <input
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Repite la contraseña"
              />

              <label htmlFor="first_name" className={styles.label} >Nombre</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />

        
              <label htmlFor="last_name" className={styles.label}>Apellidos</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                placeholder="Tus apellidos"
              />


            <label htmlFor="birth_date" className={styles.label} >Fecha de nacimiento (AAAA-MM-DD)</label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />


              <label htmlFor="locality" className={styles.label}>Localidad</label>
              <select
                id="locality"
                name="locality"
                value={formData.locality}
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
              <label htmlFor="municipality" className={styles.label}>Municipio</label>
              <select id="municipality" value={formData.municipality} onChange={handleChange} name="municipality" required>
              <option value="">Selecciona una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>



          <button 
            type="submit" 
            className={styles.formButtonSubmit} 
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        
        <div className={styles.loginLink}>
          ¿Ya tienes cuenta? <Link href="/inicio">Inicia sesión aquí</Link>
        </div>
      </div>
  );
};

export default Register;