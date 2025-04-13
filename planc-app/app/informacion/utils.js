export async function fetchUserProfileData(token) {
    const response = await fetch('http://127.0.0.1:8000/api/users/profile/', {
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
  
    return {
      username: profile.username || '',
      email: profile.email || '',
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      birth_date: profile.birth_date || '',
      locality: profile.locality || '',
      municipality: profile.municipality || ''
    };
  }


export const changePassword = async (token, oldPassword, newPassword) => {
  const response = await fetch("http://127.0.0.1:8000/api/users/change-password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.new_password?.[0] ||
      errorData.old_password ||
      "Error desconocido al cambiar la contraseña"
    );
  }

  return await response.json();
};
