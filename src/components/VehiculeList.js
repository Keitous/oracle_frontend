// src/components/VehiculeList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VehiculeList.css'; // Importation du fichier CSS pour les styles de la liste des Vehicules

// Composant fonctionnel VehiculeList
const VehiculeList = () => {
  // État pour stocker la liste des Vehicules
  const [vehicules, setVehicules] = useState([]);
    
  // Effet pour récupérer la liste des Vehicules lors du chargement du composant
  useEffect(() => {
    // Requête GET pour obtenir la liste des Vehicules depuis l'API
    axios.get('https://getv.serveo.net/api/vehicules')
      .then(response => {
        // Mise à jour de l'état avec les données des Vehicules récupérées
        setVehicules(response.data);
      })
      .catch(error => {
        // Gestion des erreurs si la récupération des Vehicules échoue
        console.error('Error fetching vehicules:', error);
      });
  }, []); // Effet déclenché uniquement lors du premier rendu du composant

  return (
    <div className="vehicule-list-container">
      <h2>Liste des Véhicules</h2>
      {/* Table pour afficher les Vehicules */}
      <table className="vehicule-list-table">
        <thead>
          <tr>
            <th>Code</th>
			<th>Libellé</th>
			<th>Nombre de Place Assise</th>
			<th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Affichage des Vehicules sous forme de lignes dans le tableau */}
          {vehicules.map(vehicule => (
            <tr key={vehicule[0]}>
              {/* Affichage des informations de chaque Vehicule */}
              <td>{vehicule[0]}</td>
              <td>{vehicule[1]}</td>
              <td>{vehicule[2]}</td>
              {/* Lien pour modifier la Vehicule, redirection vers le composant EditVehicule */}
              <td>
                <Link to={`/edit-vehicule/${vehicule[0]}`}>Modifier</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Lien pour ajouter un nouvel Vehicule */}
      <Link to="/add-vehicule" className="add-vehicule-link">Ajouter un Vehicule</Link>
    </div>
  );
};

export default VehiculeList;
