// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer le jeton d'authentification du localStorage
    localStorage.removeItem('authToken');
    // Rediriger vers la page de connexion
    navigate('/login');
  }, [navigate]);

  return null; // Ne rien afficher pendant la déconnexion
};

export default Logout;
