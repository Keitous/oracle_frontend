// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate pour la navigation
import './Home.css'; // Importation du fichier CSS pour styliser le composant

const Home = () => {
    // Création de l'objet navigate pour permettre la navigation programmatique
    const navigate = useNavigate(); 

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        // Supprimer le jeton d'authentification du localStorage
        localStorage.removeItem('authToken');
        // Rediriger vers la page de connexion
        navigate('/login');
    };

    return (
        <div className="home-container">
            {/* Titre principal affiché sur la page d'accueil */}
            <h1 className="main-title">Bienvenue dans le Système de Gestion Électronique des Tickets de Voyage</h1>
            
            {/* Sous-titre pour une meilleure présentation */}
            <p className="subtitle">Simplifiez la gestion de vos tickets avec efficacité et précision.</p>

            {/* Conteneur pour les boutons d'action */}
            <div className="buttons-container">
                {/* Bouton pour naviguer vers la page de gestion des utilisateurs */}
                <button 
                    onClick={() => navigate('/users')} 
                    className="action-button" 
                    aria-label="Accéder à la gestion des utilisateurs"
                >
                    Gestion des Utilisateurs
                </button>
                
                {/* Bouton pour naviguer vers la page de gestion des véhicules */}
                <button 
                    onClick={() => navigate('/vehicules')} 
                    className="action-button" 
                    aria-label="Accéder à la gestion des véhicules"
                >
                    Gestion des Véhicules
                </button>

                {/* Bouton pour naviguer vers la page de gestion des destinations */}
                <button 
                    onClick={() => navigate('/destinations')} 
                    className="action-button" 
                    aria-label="Accéder à la gestion des destinations"
                >
                    Gestion des Destinations
                </button>

                {/* Bouton pour naviguer vers la page de gestion des tickets */}
                <button 
                    onClick={() => navigate('/tickets')} 
                    className="action-button" 
                    aria-label="Accéder à la gestion des tickets"
                >
                    Gestion des Tickets
                </button>
                
                {/* Bouton pour naviguer vers la page de gestion des éditions et statistiques */}
                <button 
                    onClick={() => navigate('/reports')} 
                    className="action-button" 
                    aria-label="Accéder à la gestion des éditions et statistiques"
                >
                    Editions et Statistiques
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

export default Home;
