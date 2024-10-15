// src/components/DestinationList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DestinationList.css'; // Importation du fichier CSS pour les styles de la liste des destinations

// Composant fonctionnel DestinationList
const DestinationList = () => {
  // État pour stocker la liste des destinations
  const [destinations, setDestinations] = useState([]);
    
  // Effet pour récupérer la liste des destinations lors du chargement du composant
  useEffect(() => {
    // Requête GET pour obtenir la liste des destinations depuis l'API
    axios.get('https://getv.serveo.net/api/destinations')
      .then(response => {
        // Mise à jour de l'état avec les données des destinations récupérées
        setDestinations(response.data);
      })
      .catch(error => {
        // Gestion des erreurs si la récupération des destinations échoue
        console.error('Error fetching destinations:', error);
      });
  }, []); // Effet déclenché uniquement lors du premier rendu du composant

  return (
    <div className="destination-list-container">
      <h2>Liste des destinations</h2>
      {/* Table pour afficher les destinations */}
      <table className="destination-list-table">
        <thead>
          <tr>
          <th>Code</th>
          <th>Libellé</th>
          <th>Prix</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Affichage des destinations sous forme de lignes dans le tableau */}
          {destinations.map(destination => (
            <tr key={destination[0]}>
              {/* Affichage des informations de chaque destination */}
              <td>{destination[0]}</td>
              <td>{destination[1]}</td>
              <td>{destination[2]}</td>
              {/* Lien pour modifier la destination, redirection vers le composant EditDestination */}
              <td>
                <Link to={`/edit-destination/${destination[0]}`}>Modifier</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Lien pour ajouter un nouvel destination */}
      <Link to="/add-destination" className="add-destination-link">Ajouter un destination</Link>
    </div>
  );
};

export default DestinationList;
