import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css'; // Importation du fichier CSS pour les styles de cette page
import BackButton from './BackButton'; // Importation du composant BackButton pour naviguer en arrière

// Composant fonctionnel EditUser
const EditUser = () => {
    // Récupération du nom d'accès depuis les paramètres de l'URL
    const { nom_acces } = useParams(); 
    const navigate = useNavigate(); // Hook pour la navigation

    // État initial pour les informations de l'utilisateur
    const [user, setUser] = useState({
        nom_acces: '',
        nom_user: '',
        prenom_user: '',
        flag_connexion: '',
        code_type_gestion: '',
        code_fonction_role: '',
        code_fonction: '',
        code_menu: ''
    });

    // État pour stocker les listes des valeurs disponibles
    const [typeGestionOptions, setTypeGestionOptions] = useState([]);
    const [fonctionRoleOptions, setFonctionRoleOptions] = useState([]);
    const [fonctionOptions, setFonctionOptions] = useState([]);
    const [menuOptions, setMenuOptions] = useState([]);


    // État pour le message de confirmation
    const [message, setMessage] = useState('');

    // Effet pour récupérer les détails de l'utilisateur et les listes d'options lors du chargement du composant
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Récupération des détails de l'utilisateur à partir de l'API
                const response = await axios.get(`http://localhost:3001/api/users/${nom_acces}`);
                setUser(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
            }
        };

        const fetchOptions = async () => {
            try {
                // Requêtes pour récupérer les options de liste depuis l'API
                const typeGestionResponse = await axios.get('http://localhost:3001/api/type-gestion');
                const fonctionRoleResponse = await axios.get('http://localhost:3001/api/fonction-role');
                const fonctionResponse = await axios.get('http://localhost:3001/api/fonction');
                const menuResponse = await axios.get('http://localhost:3001/api/menu');

                // Transformation des données reçues pour s'assurer qu'elles sont au format attendu
                setTypeGestionOptions(typeGestionResponse.data.map(item => ({
                    value: item[0], // Premier élément du tableau représente la valeur
                    label: item[1]  // Deuxième élément du tableau représente le libellé
                })));

                setFonctionRoleOptions(fonctionRoleResponse.data.map(item => ({
                    value: item[0], // Premier élément du tableau représente la valeur
                    label: item[1]  // Deuxième élément du tableau représente le libellé
                })));

                setFonctionOptions(fonctionResponse.data.map(item => ({
                    value: item[0], // Premier élément du tableau représente la valeur
                    label: item[1]  // Deuxième élément du tableau représente le libellé
                })));

                setMenuOptions(menuResponse.data.map(item => ({
                    value: item[0], // Premier élément du tableau représente la valeur
                    label: item[1]  // Deuxième élément du tableau représente le libellé
                })));
            } catch (error) {
                console.error('Erreur lors de la récupération des options:', error);
            }
        };

        fetchUser();
        fetchOptions();
    }, [nom_acces]); // Dépendance sur nom_acces pour réexécuter useEffect lors du changement

    // Gestion des changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Gestion de la soumission du formulaire pour mettre à jour l'utilisateur
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/users/${nom_acces}`, user);
            setMessage('Utilisateur modifié avec succès');
            setTimeout(() => {
                navigate('/users'); // Redirection vers la liste des utilisateurs après succès
            }, 2000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            setMessage('Erreur lors de la modification de l\'utilisateur');
        }
    };

    return (
        <div className="edit-user-container">
            <BackButton /> {/* Composant pour revenir à la page précédente */}
            <h2>Modification de l'Utilisateur</h2>
            {message && <div className="message">{message}</div>} {/* Affichage du message de confirmation */}
            <form onSubmit={handleUpdateUser}>
                <div className="form-group">
                    <label htmlFor="nom_acces">Nom Accès:</label>
                    <input
                        type="text"
                        id="nom_acces"
                        name="nom_acces"
                        value={nom_acces}
                        readOnly // Champ en lecture seule pour le nom d'accès
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nom_user">Nom:</label>
                    <input
                        type="text"
                        id="nom_user"
                        name="nom_user"
                        value={user.nom_user}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="prenom_user">Prénom:</label>
                    <input
                        type="text"
                        id="prenom_user"
                        name="prenom_user"
                        value={user.prenom_user}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="flag_connexion">Flag Connexion:</label>
                    <input
                        type="text"
                        id="flag_connexion"
                        name="flag_connexion"
                        value={user.flag_connexion}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="code_type_gestion">Type de Gestion:</label>
                    <select
                        id="code_type_gestion"
                        name="code_type_gestion"
                        value={user.code_type_gestion}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Sélectionner un type de gestion</option>
                        {typeGestionOptions.length > 0 ? (
                            typeGestionOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                        ) : (
                            <option value="">Aucune option disponible</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="code_fonction_role">Fonction Role:</label>
                    <select
                        id="code_fonction_role"
                        name="code_fonction_role"
                        value={user.code_fonction_role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Sélectionner une fonction role</option>
                        {fonctionRoleOptions.length > 0 ? (
                            fonctionRoleOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                        ) : (
                            <option value="">Aucune option disponible</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="code_fonction">Fonction:</label>
                    <select
                        id="code_fonction"
                        name="code_fonction"
                        value={user.code_fonction}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Sélectionner une fonction</option>
                        {fonctionOptions.length > 0 ? (
                            fonctionOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                        ) : (
                            <option value="">Aucune option disponible</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="code_menu">Menu:</label>
                    <select
                        id="code_menu"
                        name="code_menu"
                        value={user.code_menu}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Sélectionner un menu</option>
                        {menuOptions.length > 0 ? (
                            menuOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                        ) : (
                            <option value="">Aucune option disponible</option>
                        )}
                    </select>
                </div>
                <button type="submit">Modifier</button> {/* Bouton de soumission du formulaire */}
            </form>
        </div>
    );
};

export default EditUser;
