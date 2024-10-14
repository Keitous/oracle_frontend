// src/components/EditVehicule.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditVehicule.css'; // Importation du fichier CSS pour les styles de cette page
import BackButton from './BackButton'; // Importation du composant BackButton pour naviguer en arrière

// Composant fonctionnel EditVehicule
const EditVehicule = () => {
    // Extraction du code véhicule depuis les paramètres de l'URL
    const { code_vehicule } = useParams();
    // Hook pour la navigation entre les pages
    const navigate = useNavigate();
    // État pour stocker les informations du véhicule
    const [vehicule, setVehicule] = useState({
        code_vehicule: '',
        libelle_vehicule: '',
        nombre_place_assise: '',
    });

    // Effet pour récupérer les détails du véhicule lors du chargement du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données du véhicule
        const fetchVehicule = async () => {
            try {
                // Requête GET pour obtenir les détails du véhicule depuis l'API
                const response = await axios.get(`http://localhost:3001/api/vehicules/${code_vehicule}`);
                console.log('Données récupérées:', response.data); // Vérifie la structure des données récupérées
                // Mise à jour de l'état avec les données du véhicule
                setVehicule(response.data);
            } catch (error) {
                // Gestion des erreurs si la récupération des données échoue
                console.error('Erreur lors de la récupération des détails du véhicule:', error);
            }
        };
        fetchVehicule(); // Appel de la fonction pour récupérer les données
    }, [code_vehicule]); // Dépendance sur code_vehicule : effet déclenché lorsque code_vehicule change

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Mise à jour de l'état du véhicule avec les nouvelles valeurs
        setVehicule({ ...vehicule, [name]: value });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleUpdateVehicule = async (e) => {
        e.preventDefault(); // Prévenir le comportement par défaut de soumission du formulaire
        try {
            console.log('Données envoyées pour la mise à jour:', vehicule); // Vérifie les données envoyées pour la mise à jour
            // Requête PUT pour mettre à jour les détails du véhicule dans l'API
            await axios.put(`http://localhost:3001/api/vehicules/${code_vehicule}`, vehicule);
            // Redirection vers la liste des véhicules après la mise à jour
            navigate('/vehicules');
        } catch (error) {
            // Gestion des erreurs si la mise à jour échoue
            console.error('Erreur lors de la mise à jour du véhicule:', error);
        }
    };

    return (
        <div className="edit-vehicule-container">
            <BackButton /> {/* Composant pour le bouton de retour */}
            <h2>Modification du véhicule</h2>
            {/* Formulaire pour la modification des détails du véhicule */}
            <form onSubmit={handleUpdateVehicule}>
                {/* Champ pour afficher le code destination (en lecture seule) */}
                <div className="form-group">
                    <label htmlFor="code_vehicule">Code:</label>
                    <input
                        type="text"
                        id="code_vehicule"
                        name="code_vehicule"
                        value={vehicule.code_vehicule} // Affichage du code du véhicule dans le champ
                        readOnly // Champ en lecture seule
                    />
                </div>
                {/* Champ pour le libellé du véhicule */}
                <div className="form-group">
                    <label htmlFor="libelle_vehicule">Libellé:</label>
                    <input
                        type="text"
                        id="libelle_vehicule"
                        name="libelle_vehicule"
                        value={vehicule.libelle_vehicule} // Valeur du libellé du véhicule
                        onChange={handleInputChange} // Gestion des changements
                        required // Champ requis
                    />
                </div>
                {/* Champ pour le nombre de place assise du véhicule */}
                <div className="form-group">
                    <label htmlFor="nombre_place_assise">Nombre de place assise:</label>
                    <input
                        type="number"
                        id="nombre_place_assise"
                        name="nombre_place_assise"
                        value={vehicule.nombre_place_assise} // nombre de place assise du véhicule
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

export default EditVehicule;
