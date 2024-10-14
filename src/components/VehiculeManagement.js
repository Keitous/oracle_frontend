import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddVehicule from './AddVehicule'; // Assurez-vous que ce fichier existe et est correctement nommé
import VehiculeList from './VehiculeList'; // Assurez-vous que ce fichier existe et est correctement nommé
import './VehiculeManagement.css'; // Assurez-vous que ce fichier CSS existe et est correctement nommé


// Composant fonctionnel VehiculeManagement
const VehiculeManagement = () => {
    const [activeMenu, setActiveMenu] = useState(null); // Utilisation de null pour l'état initial
    const navigate = useNavigate(); // Création de l'objet navigate pour la navigation programmatique

    // Fonction pour rendre le menu actif en fonction de la valeur de activeMenu
    const renderMenu = () => {
        switch (activeMenu) {
            case 'add':
                return <AddVehicule />; // Affiche le composant AddVehicule si 'add' est le menu actif
            case 'list':
                return <VehiculeList />; // Affiche le composant VehiculeList si 'list' est le menu actif
            default:
                return <VehiculeList />; // Aucun contenu à afficher pour les autres cas
        }
    };

    return (
        <div className="vehicule-management-container">
            <h2>Gestion des Véhicules</h2>
            <div className="menu">
                {/* Bouton pour passer au menu d'ajout des véhicules */}
                <button onClick={() => setActiveMenu('add')}>Ajout d'un Véhicule</button>
                {/* Bouton pour passer au menu de la liste des véhicules */}
                <button onClick={() => setActiveMenu('list')}>Liste des Véhicules</button>
                {/* Bouton pour revenir à l'accueil */}
                <button onClick={() => navigate('/DashboardVehicule')}>Retour à l'Accueil</button>
            </div>
            {/* Affichage du contenu du menu actif */}
            <div className="content">
                {renderMenu()}
            </div>
        </div>
    );
};

export default VehiculeManagement;
