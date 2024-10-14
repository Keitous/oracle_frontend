// src/components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'; // Assurez-vous d'avoir ce fichier CSS

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Retourne à la page précédente
  };

  return (
    <button className="back-button" onClick={handleBackClick}>
      &#9664; Retour
    </button>
  );
};

export default BackButton;
