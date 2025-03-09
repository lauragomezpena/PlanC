export const saveToken = (token) => {
  if (typeof window !== "undefined") {  // Asegurarse de que esté en el cliente
    localStorage.setItem('token', token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {  // Asegurarse de que esté en el cliente
    return localStorage.getItem('token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {  // Asegurarse de que esté en el cliente
    localStorage.removeItem('token');
  }
};

export const isAuthenticated = () => {
  return !!getToken(); // Devuelve true si hay un token, false si no
};
