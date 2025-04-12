'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../page.module.css";

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
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token-jwt');

      if (!token) {
        router.push('/inicio');
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await fetch('https://das-p2-backend.onrender.com/api/users/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Sesión expirada o error al obtener el perfil.');
        }

        const profile = await response.json();

        setProfileData({
          username: profile.username || '',
          email: profile.email || '',
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          birth_date: profile.birth_date || '',
          locality: profile.locality || '',
          municipality: profile.municipality || ''
        });

      } catch (err) {
        console.error('Error al cargar perfil:', err);
        setError('Error al cargar el perfil. Por favor, inténtalo de nuevo más tarde.');
        router.push('/inicio');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (loading) {
    return <div className={styles.loading}>Cargando información del perfil...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.form}>
      <div className={styles.profileViewBox}>
        <h2 className={styles.title}>Información del Perfil</h2>

        
        <form className={styles.form}>
          <label className={styles.label}>Nombre de usuario</label>
          <input type="text" value={profileData.username} disabled  />

          <label className={styles.label}>Email</label>
          <input type="email" value={profileData.email} disabled />


          <label className={styles.label}>Nombre</label>
          <input type="text" value={profileData.first_name} disabled  />


          <label className={styles.label}>Apellidos</label>
          <input type="text" value={profileData.last_name} disabled className={styles.input} />


          <label className={styles.label}>Fecha de nacimiento</label>
          <input type="date" value={profileData.birth_date} disabled className={styles.input} />


          <label className={styles.label}>Localidad</label>
          <input type="text" value={profileData.locality} disabled className={styles.input} />

          <label className={styles.label}>Municipio</label>
          <input type="text" value={profileData.municipality} disabled className={styles.input} />


          </form>
      </div>
    </div>
  );
}