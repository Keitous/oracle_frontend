// src/components/UserManagement.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate pour la navigation
import AddUser from './AddUser'; // Import du composant AddUser pour l'ajout d'utilisateurs
import UserList from './UserList'; // Import du composant UserList pour afficher la liste des utilisateurs
import './UserManagement.css'; // Import du fichier CSS pour les styles de gestion des utilisateurs

// Composant fonctionnel UserManagement
const UserManagement = () => {
    // État pour suivre le menu actif (par défaut 'null' pour afficher le formulaire d'ajout d'utilisateurs)
    const [activeMenu, setActiveMenu] = useState('null');
    const navigate = useNavigate(); // Création de l'objet navigate pour la navigation programmatique

    // Fonction pour rendre le menu actif en fonction de la valeur de activeMenu
    const renderMenu = () => {
        switch (activeMenu) {
            case 'add':
                return <AddUser />; // Affiche le composant AddUser si 'add' est le menu actif
            case 'list':
                return <UserList />; // Affiche le composant UserList si 'list' est le menu actif
            default:
                return <UserList />; // Aucun contenu à afficher pour les autres cas
        }
    };

    return (
        <div className="user-management-container">
            <h2>Gestion des Utilisateurs</h2>
            <div className="menu">
                {/* Bouton pour passer au menu d'ajout des utilisateurs */}
                <button onClick={() => setActiveMenu('add')}>Ajout des Utilisateurs</button>
                {/* Bouton pour passer au menu de la liste des utilisateurs */}
                <button onClick={() => setActiveMenu('list')}>Liste des Utilisateurs</button>
                {/* Bouton pour revenir à l'accueil */}
                <button onClick={() => navigate('/DashboardTicket')}>Retour à l'Accueil</button>
            </div>
            {/* Affichage du contenu du menu actif */}
            <div className="content">
                {renderMenu()}
            </div>
        </div>
    );
};

export default UserManagement;
