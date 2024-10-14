import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddDestination from './AddDestination'; // Import du composant pour ajouter une destination
import DestinationList from './DestinationList'; // Import du composant pour afficher la liste des destinations
import './DestinationManagement.css'; // Import du fichier CSS pour les styles de gestion des destinations


// Composant fonctionnel DestinationManagement
const DestinationManagement = () => {
    const [activeMenu, setActiveMenu] = useState(null); // Utilisation de null au lieu de 'null' pour l'état initial
    const navigate = useNavigate(); // Création de l'objet navigate pour la navigation programmatique

    // Fonction pour rendre le menu actif en fonction de la valeur de activeMenu
    const renderMenu = () => {
        switch (activeMenu) {
            case 'add':
                return <AddDestination />; // Affiche le composant AddDestination si 'add' est le menu actif
            case 'list':
                return <DestinationList />; // Affiche le composant DestinationList si 'list' est le menu actif
            default:
                return <DestinationList />; // Aucun contenu à afficher pour les autres cas
        }
    };

    return (
        <div className="destination-management-container">
            <h2>Gestion des Destinations</h2>
            <div className="menu">
                {/* Bouton pour passer au menu d'ajout des destinations */}
                <button onClick={() => setActiveMenu('add')}>Ajout d'une Destination</button>
                {/* Bouton pour passer au menu de la liste des destinations */}
                <button onClick={() => setActiveMenu('list')}>Liste des Destinations</button>
                {/* Bouton pour revenir à l'accueil */}
                <button onClick={() => navigate('/DashboardDestination')}>Retour à l'Accueil</button>
            </div>
            {/* Affichage du contenu du menu actif */}
            <div className="content">
                {renderMenu()}
            </div>
        </div>
    );
};

export default DestinationManagement;
