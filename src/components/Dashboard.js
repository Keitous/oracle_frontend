import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Importation du fichier CSS

const Dashboard = () => {
  const [error, setError] = useState(null);

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
      {userInfo ? (
        <div className="user-info">
          <p><strong>Nom d'accès:</strong> {userInfo.nom_acces}</p>
          {/* Ajoutez d'autres informations utilisateur si nécessaire */}
        </div>
      ) : (
        <p>Chargement des informations utilisateur...</p>
      )}
      <nav className="main-menu">
        <ul>
          <li><Link to="/users">Gestion des Utilisateurs</Link></li>
          <li><Link to="/vehicules">Gestion des Véhicules</Link></li>
          <li><Link to="/destinations">Gestion des Destinations</Link></li>
          <li><Link to="/destinations">Gestion des Tickets</Link></li>
          <li><Link to="/destinations">Editions et Statistiques</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
