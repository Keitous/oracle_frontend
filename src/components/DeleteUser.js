// src/components/DeleteUser.js
import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [nomAcces, setNomAcces] = useState(''); // Nom d'accès de l'utilisateur à supprimer

  const handleDeleteUser = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    try {
      // Suppression de l'utilisateur par le nom d'accès
      await axios.delete(`http://localhost:3001/api/users/${nomAcces}`);
      alert('Utilisateur supprimé avec succès.');
      setNomAcces(''); // Réinitialiser le champ après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      alert('Erreur lors de la suppression de l\'utilisateur.');
    }
  };

  return (
    <div className="delete-user">
      <h3>Supprimer un Utilisateur</h3>
      <form onSubmit={handleDeleteUser}>
        <div className="form-group">
          <label htmlFor="nom_acces">Nom d'accès:</label>
          <input
            type="text"
            id="nom_acces"
            value={nomAcces}
            onChange={(e) => setNomAcces(e.target.value)}
            placeholder="Entrez le nom d'accès de l'utilisateur à supprimer"
            required
          />
        </div>
        <button type="submit">Supprimer</button>
      </form>
    </div>
  );
};

export default DeleteUser;
