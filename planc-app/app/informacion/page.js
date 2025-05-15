'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../page.module.css";
import { fetchUserProfileData, changePassword } from './utils';
import Button from '@/components/Button/button';

export default function UserProfilePage() {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    locality: '',
    municipality: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token-jwt');

      if (!token) {
        router.push('/inicio');
        return;
      }

      try {
        setLoading(true);
        setError('');

        const data = await fetchUserProfileData(token);
        setProfileData(data);
      } catch (err) {
        console.error('Error al cargar perfil:', err);
        setError('Error al cargar el perfil. Por favor, inténtalo de nuevo más tarde.');
        router.push('/inicio');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }

    const token = localStorage.getItem('token-jwt');

    if (!token) {
      setError('Token no encontrado. Por favor, vuelve a iniciar sesión.');
      return;
    }

    try {
      const result = await changePassword(token, oldPassword, newPassword);
      setPasswordSuccess(result.detail || 'Contraseña cambiada correctamente.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Error al cambiar la contraseña.');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando información del perfil...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.form}>
      <div>
        <h2>Información del Perfil</h2>

        <form className={styles.form}>
          <label className={styles.label}>Nombre de usuario</label>
          <input type="text" value={profileData.username} disabled />

          <label className={styles.label}>Email</label>
          <input type="email" value={profileData.email} disabled />

          <label className={styles.label}>Nombre</label>
          <input type="text" value={profileData.first_name} disabled />

          <label className={styles.label}>Apellidos</label>
          <input type="text" value={profileData.last_name} disabled className={styles.input} />

          <label className={styles.label}>Fecha de nacimiento</label>
          <input type="date" value={profileData.birth_date} disabled className={styles.input} />

          <label className={styles.label}>Localidad</label>
          <input type="text" value={profileData.locality} disabled className={styles.input} />

          <label className={styles.label}>Municipio</label>
          <input type="text" value={profileData.municipality} disabled className={styles.input} />
        </form>

        <h3>Cambiar contraseña</h3>
        <form onSubmit={handlePasswordChange} className={styles.form}>
          <label>
            Contraseña actual:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Nueva contraseña:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirmar nueva contraseña:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          {passwordSuccess && <p className={styles.success}>{passwordSuccess}</p>}
          <Button type="submit" label  = "Cambiar contraseña"/>
        </form>
      </div>
    </div>
  );
}
