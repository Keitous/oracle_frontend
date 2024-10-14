import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddVehicule.css'; // Import du fichier CSS pour les styles du formulaire d'ajout de Véhicule
import BackButton from './BackButton'; // Import du composant BackButton pour revenir à la page précédente

// Composant fonctionnel AddVehicule
const AddVehicule = () => {
    const [codeVehicule, setCodeVehicule] = useState('');
    const [libelleVehicule, setLibelleVehicule] = useState('');
    const [nombrePlaceAssise, setNombrePlaceAssise] = useState('');
    const navigate = useNavigate(); // Création de l'objet navigate pour la navigation programmatique

    // Fonction appelée lors de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
        try {
            // Envoi des données du formulaire au serveur pour ajouter un nouveau Véhicule
            await axios.post('http://localhost:3001/api/vehicules', {
                code_vehicule: codeVehicule,
                libelle_vehicule: libelleVehicule,
                nombre_place_assise: nombrePlaceAssise
            });
            navigate('/vehicule-list'); // Redirection vers la liste des véhicules après l'ajout
        } catch (error) {
            console.error('Erreur lors de l\'ajout du Véhicule:', error); // Gestion des erreurs
        }
    };

    return (
        <div className="add-vehicule-container">
            
            <h2>Ajout d'un Véhicule</h2>
            <form className="add-vehicule-form" onSubmit={handleSubmit}>
                {/* Champ pour le code du Véhicule */}
                <div className="form-group">
                    <label htmlFor="code_vehicule">Code :</label>
                    <input
                        type="text"
                        id="code_vehicule"
                        value={codeVehicule}
                        onChange={(e) => setCodeVehicule(e.target.value)}
                        placeholder="Code Véhicule"
                        required
                    />
                </div>
                {/* Champ pour le libellé du Véhicule */}
                <div className="form-group">
                    <label htmlFor="libelle_vehicule">Libellé :</label>
                    <input
                        type="text"
                        id="libelle_vehicule"
                        value={libelleVehicule}
                        onChange={(e) => setLibelleVehicule(e.target.value)}
                        placeholder="Libellé Véhicule"
                        required
                    />
                </div>
                {/* Champ pour le nombre de places assises du véhicule */}
                <div className="form-group">
                    <label htmlFor="nombre_place_assise">Nombre de Places Assises :</label>
                    <input
                        type="number"
                        id="nombre_place_assise"
                        value={nombrePlaceAssise}
                        onChange={(e) => setNombrePlaceAssise(e.target.value)}
                        placeholder="Nombre de Places Assises"
                        required
                    />
                </div>
                {/* Bouton de soumission du formulaire */}
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddVehicule;
