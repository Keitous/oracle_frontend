import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddDestination.css'; // Import du fichier CSS pour les styles du formulaire d'ajout de destination
import BackButton from './BackButton'; // Import du composant BackButton pour revenir à la page précédente

// Composant fonctionnel AddDestination
const AddDestination = () => {
    const [codeDestination, setCodeDestination] = useState('');
    const [libelleDestination, setLibelleDestination] = useState('');
    const [prixDestination, setPrixDestination] = useState('');
    const navigate = useNavigate(); // Création de l'objet navigate pour la navigation programmatique

    // Fonction appelée lors de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
        try {
            // Envoi des données du formulaire au serveur pour ajouter une nouvelle destination
            await axios.post('http://localhost:3001/api/destinations', {
                codeDestination,
                libelleDestination,
                prixDestination
            });
            navigate('/destination-list'); // Redirection vers la liste des destinations après l'ajout
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la destination:', error); // Gestion des erreurs
        }
    };

    return (
        <div className="add-destination-container">
             {/* <BackButton />  */}
            <h2>Ajout d'une Destination</h2>
            <form className="add-destination-form" onSubmit={handleSubmit}>
                {/* Champ pour le code de la destination */}
                <div className="form-group">
                    <label htmlFor="code_destination">Code :</label>
                    <input
                        type="text"
                        id="code_destination"
                        value={codeDestination}
                        onChange={(e) => setCodeDestination(e.target.value)}
                        placeholder="Code Destination"
                        required
                    />
                </div>
                {/* Champ pour le libellé de la destination */}
                <div className="form-group">
                    <label htmlFor="libelle_destination">Libellé :</label>
                    <input
                        type="text"
                        id="libelle_destination"
                        value={libelleDestination}
                        onChange={(e) => setLibelleDestination(e.target.value)}
                        placeholder="Libellé Destination"
                        required
                    />
                </div>
                {/* Champ pour le prix de la destination */}
                <div className="form-group">
                    <label htmlFor="prix_destination">Prix :</label>
                    <input
                        type="number"
                        id="prix_destination"
                        value={prixDestination}
                        onChange={(e) => setPrixDestination(e.target.value)}
                        placeholder="Prix Destination"
                        required
                    />
                </div>
                {/* Bouton de soumission du formulaire */}
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddDestination;
