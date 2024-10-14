import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate pour la navigation
import './DashboardVehicule.css'; // Importation du fichier CSS

const DashboardVehicule = () => {
  const [error, setError] = useState(null);
  // Création de l'objet navigate pour permettre la navigation programmatique
  const navigate = useNavigate(); 
  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Supprimer le jeton d'authentification du localStorage
    localStorage.removeItem('authToken');
    // Rediriger vers la page de connexion
    navigate('/login');
};

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Utilisateur non authentifié.');
        return;
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Bienvenue dans le Système de Gestion Électronique des Tickets de Voyage</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="buttons-container">      
        {/* Bouton pour naviguer vers la page de gestion des véhicules */}
        <button 
            onClick={() => navigate('/vehicules')} 
            className="action-button" 
            aria-label="Accéder à la gestion des véhicules"
        >
            Gestion des Véhicules
        </button> 
        {/* Bouton pour déconnexion */}
        <button 
            onClick={handleLogout} 
            className="action-button" 
            aria-label="Se déconnecter"
        >
            Déconnexion
        </button>     
      </div>
    </div>
  );
};

export default DashboardVehicule;
