'use client';
import styles from "../../app/page.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  const handleClear = () => {
    setUser('');
    setPasswd('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Intentando iniciar sesión con:', { username, password });
      
      // Usar la función login del contexto de autenticación
      await login(username, password);
      
      console.log('Login exitoso');
      router.push('/');
    } catch (error) {
      console.error('Error durante login:', error);
      
  
      if (error.validationErrors) {
        const errorMessages = [];
        
        Object.entries(error.validationErrors).forEach(([field, messages]) => {
          const fieldName = getFieldDisplayName(field);
          
          if (Array.isArray(messages)) {
            messages.forEach(message => {
              errorMessages.push(`${fieldName}: ${formatErrorMessage(message)}`);
            });
          } else if (typeof messages === 'string') {
            errorMessages.push(`${fieldName}: ${formatErrorMessage(messages)}`);
          }
        });
        
        if (errorMessages.length > 0) {
          setError(errorMessages.join('\n'));
        } else {
          setError('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
        }
      } else {
        setError('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  const getFieldDisplayName = (field) => {
    const fieldNames = {
      username: 'Nombre de usuario',
      email: 'Email',
      password: 'Contraseña',
      non_field_errors: 'Error',
      detail: 'Detalle'
    };
    
    return fieldNames[field] || field;
  };
  

  const formatErrorMessage = (message) => {
    const translations = {
      'A user with that username already exists.': 'Este nombre de usuario ya está en uso.',
      'This password is too common.': 'Esta contraseña es demasiado común.',
      'Unable to log in with provided credentials.': 'No se puede iniciar sesión con las credenciales proporcionadas.',
      'This field may not be blank.': 'Este campo no puede estar vacío.',
      'No active account found with the given credentials': 'No se encontró una cuenta activa con las credenciales proporcionadas.'
    };
    
    return translations[message] || message;
  };

  return (

      <div>
        <h1>Inicia sesión en tu cuenta</h1>
        <br />
        <h2>Si no tienes cuenta, <a href="/registro">Regístrate</a></h2>
        
        {error && (
          <div className={styles.error}>
            {error.split('\n').map((line, index) => (
              <div key={index} className={styles.errorLine}>{line}</div>
            ))}
          </div>
        )}
        
        <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="user" className={styles.label}>Usuario</label>
          <input
            type="text"
            className={styles.loginFormInput}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="passwd" className={styles.label}>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.loginFormInput}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            className={styles.formButtonSubmit}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Iniciar sesión'}
          </button>
          
          <div className={styles.formButtons}>
            <button type="reset" className={styles.formButton} onClick={handleClear}>Limpiar Formulario</button>
            <button type="button" className={styles.formButton} onClick={() => window.location.href = '/registro'}>
              Registrarse
            </button>
          </div>
        </form>
        

        
      </div>

  );
}