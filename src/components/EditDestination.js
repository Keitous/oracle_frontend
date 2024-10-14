// src/components/EditDestination.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditDestination.css'; // Importation du fichier CSS pour les styles de cette page
import BackButton from './BackButton'; // Importation du composant BackButton pour naviguer en arrière

// Composant fonctionnel EditDestination
const EditDestination = () => {
    // Extraction du code destination depuis les paramètres de l'URL
    const { code_destination } = useParams();
    // Hook pour la navigation entre les pages
    const navigate = useNavigate();
    // État pour stocker les informations de la destination
    const [destination, setDestination] = useState({
        code_destination: '',
        libelle_destination: '',
        prix_destination: '',
    });

    // Effet pour récupérer les détails de la destination lors du chargement du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données de la destination
        const fetchDestination = async () => {
            try {
                // Requête GET pour obtenir les détails de la destination depuis l'API
                const response = await axios.get(`http://localhost:3001/api/destinations/${code_destination}`);
                console.log('Données récupérées:', response.data); // Vérifie la structure des données récupérées
                // Mise à jour de l'état avec les données de la destination
                setDestination(response.data);
            } catch (error) {
                // Gestion des erreurs si la récupération des données échoue
                console.error('Erreur lors de la récupération des détails de la destination:', error);
            }
        };
        fetchDestination(); // Appel de la fonction pour récupérer les données
    }, [code_destination]); // Dépendance sur code_destination : effet déclenché lorsque code_destination change

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Mise à jour de l'état de la destination avec les nouvelles valeurs
        setDestination({ ...destination, [name]: value });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleUpdateDestination = async (e) => {
        e.preventDefault(); // Prévenir le comportement par défaut de soumission du formulaire
        try {
            console.log('Données envoyées pour la mise à jour:', destination); // Vérifie les données envoyées pour la mise à jour
            // Requête PUT pour mettre à jour les détails de la destination dans l'API
            await axios.put(`http://localhost:3001/api/destinations/${code_destination}`, destination);
            // Redirection vers la liste des destinations après la mise à jour
            navigate('/destinations');
        } catch (error) {
            // Gestion des erreurs si la mise à jour échoue
            console.error('Erreur lors de la mise à jour de la destination:', error);
        }
    };

    return (
        <div className="edit-destination-container">
            <BackButton /> {/* Composant pour le bouton de retour */}
            <h2>Modification de la destination</h2>
            {/* Formulaire pour la modification des détails de la destination */}
            <form onSubmit={handleUpdateDestination}>
                {/* Champ pour afficher le code destination (en lecture seule) */}
                <div className="form-group">
                    <label htmlFor="code_destination">Code:</label>
                    <input
                        type="text"
                        id="code_destination"
                        name="code_destination"
                        value={destination.code_destination} // Affichage du code de la destination dans le champ
                        readOnly // Champ en lecture seule
                    />
                </div>
                {/* Champ pour le libellé de la destination */}
                <div className="form-group">
                    <label htmlFor="libelle_destination">Libellé:</label>
                    <input
                        type="text"
                        id="libelle_destination"
                        name="libelle_destination"
                        value={destination.libelle_destination} // Valeur du libellé de la destination
                        onChange={handleInputChange} // Gestion des changements
                        required // Champ requis
                    />
                </div>
                {/* Champ pour le prix de la destination */}
                <div className="form-group">
                    <label htmlFor="prix_destination">Prix:</label>
                    <input
                        type="text"
                        id="prix_destination"
                        name="prix_destination"
                        value={destination.prix_destination} // Valeur du prix de la destination
                        onChange={handleInputChange} // Gestion des changements
                        required // Champ requis
                    />
                </div>
                {/* Bouton pour soumettre le formulaire */}
                <button type="submit">Modifier</button>
            </form>
        </div>
    );
};

export default EditDestination;
