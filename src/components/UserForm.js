// src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    nom_acces: '',
    nom_user: '',
    prenom_user: '',
    flag_connexion: '',
    code_type_gestion: '',
    code_fonction_role: '',
    code_fonction: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/users', formData)
      .then(response => {
        alert('User added successfully');
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nom_acces" placeholder="Nom d'accès" value={formData.nom_acces} onChange={handleChange} />
      <input type="text" name="nom_user" placeholder="Nom" value={formData.nom_user} onChange={handleChange} />
      <input type="text" name="prenom_user" placeholder="Prénom" value={formData.prenom_user} onChange={handleChange} />
      <input type="text" name="flag_connexion" placeholder="Flag Connexion" value={formData.flag_connexion} onChange={handleChange} />
      <input type="text" name="code_type_gestion" placeholder="Type Gestion" value={formData.code_type_gestion} onChange={handleChange} />
      <input type="text" name="code_fonction_role" placeholder="Fonction Role" value={formData.code_fonction_role} onChange={handleChange} />
      <input type="text" name="code_fonction" placeholder="Code Fonction" value={formData.code_fonction} onChange={handleChange} />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
