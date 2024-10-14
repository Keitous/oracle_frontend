// src/components/UserList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css'; // Importation du fichier CSS pour les styles de la liste des utilisateurs

// Composant fonctionnel UserList
const UserList = () => {
  // État pour stocker la liste des utilisateurs
  const [users, setUsers] = useState([]);
    
  // Effet pour récupérer la liste des utilisateurs lors du chargement du composant
  useEffect(() => {
    // Requête GET pour obtenir la liste des utilisateurs depuis l'API
    axios.get('https://464d0803b6372f8f4d0542b8bc0a7111.serveo.net/api/users')
      .then(response => {
        // Mise à jour de l'état avec les données des utilisateurs récupérées
        setUsers(response.data);
      })
      .catch(error => {
        // Gestion des erreurs si la récupération des utilisateurs échoue
        console.error('Error fetching users:', error);
      });
  }, []); // Effet déclenché uniquement lors du premier rendu du composant

  return (
    <div className="user-list-container">
      <h2>Liste des utilisateurs</h2>
      {/* Table pour afficher les utilisateurs */}
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Nom d'accès</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Flag Connexion</th>
            <th>Type de Gestion</th>
            <th>Role</th>
            <th>Fonction</th>
            <th>Menu</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Affichage des utilisateurs sous forme de lignes dans le tableau */}
          {users.map(user => (
            <tr key={user[0]}>
              {/* Affichage des informations de chaque utilisateur */}
              <td>{user[0]}</td>
              <td>{user[1]}</td>
              <td>{user[2]}</td>
              <td>{user[3]}</td>
              <td>{user[4]}</td>
              <td>{user[5]}</td>
              <td>{user[6]}</td>
              <td>{user[7]}</td>
           {/* Lien pour modifier l'utilisateur, redirection vers le composant EditUser */}
              <td>
                <Link to={`/edit/${user[0]}`}>Modifier</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Lien pour ajouter un nouvel utilisateur */}
      <Link to="/add" className="add-user-link">Ajouter un utilisateur</Link>
    </div>
  );
};

export default UserList;
