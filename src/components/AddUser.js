// src/components/AddUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import './AddUser.css';
import BackButton from './BackButton';

const AddUser = () => {
    const [nom_acces, setNomAcces] = useState('');
    const [nom_user, setNomUser] = useState('');
    const [prenom_user, setPrenomUser] = useState('');
    const [flag_connexion, setFlagConnexion] = useState('');
    const [code_type_gestion, setCodeTypeGestion] = useState('');
    const [code_fonction_role, setCodeFonctionRole] = useState('');
    const [code_fonction, setCodeFonction] = useState('');
    const [code_menu, setCodeMenu] = useState('');
    const [typeGestionOptions, setTypeGestionOptions] = useState([]);
    const [fonctionRoleOptions, setFonctionRoleOptions] = useState([]);
    const [fonctionOptions, setFonctionOptions] = useState([]);
    const [menuOptions, setMenuOptions] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    //const navigate = useNavigate();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [typeGestionResponse, fonctionRoleResponse, fonctionResponse, menuResponse] = await Promise.all([
                    axios.get('http://localhost:3001/api/type-gestion'),
                    axios.get('http://localhost:3001/api/fonction-role'),
                    axios.get('http://localhost:3001/api/fonction'),
                    axios.get('http://localhost:3001/api/menu')
                ]);

                setTypeGestionOptions(typeGestionResponse.data.map(([code, label]) => ({ code, label })));
                setFonctionRoleOptions(fonctionRoleResponse.data.map(([code, label]) => ({ code, label })));
                setFonctionOptions(fonctionResponse.data.map(([code, label]) => ({ code, label })));
                setMenuOptions(menuResponse.data.map(([code, label]) => ({ code, label })));
            } catch (error) {
                console.error('Erreur lors du chargement des options:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/users', {
                nom_acces,
                nom_user,
                prenom_user,
                flag_connexion,
                code_type_gestion,
                code_fonction_role,
                code_fonction,
                code_menu,
                // Ajouter un mot de passe par défaut
                default_password: 'password123', // Exemple de mot de passe par défaut
            });
            setSuccessMessage('Utilisateur ajouté avec succès. Veuillez vous connecter.');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
    };

    return (
        <div className="add-user-container">
            <BackButton />
            <h2>Ajout d'un Utilisateur</h2>
            <form className="add-user-form" onSubmit={handleSubmit}>
                {/* Champ pour le nom d'accès */}
                <div className="form-group">
                    <label htmlFor="nom_acces">Nom d'accès:</label>
                    <input
                        type="text"
                        id="nom_acces"
                        value={nom_acces}
                        onChange={(e) => setNomAcces(e.target.value)}
                        placeholder="Nom d'accès"
                        required
                    />
                </div>

                {/* Champ pour le nom */}
                <div className="form-group">
                    <label htmlFor="nom_user">Nom:</label>
                    <input
                        type="text"
                        id="nom_user"
                        value={nom_user}
                        onChange={(e) => setNomUser(e.target.value)}
                        placeholder="Nom"
                        required
                    />
                </div>

                {/* Champ pour le prénom */}
                <div className="form-group">
                    <label htmlFor="prenom_user">Prénom:</label>
                    <input
                        type="text"
                        id="prenom_user"
                        value={prenom_user}
                        onChange={(e) => setPrenomUser(e.target.value)}
                        placeholder="Prénom"
                        required
                    />
                </div>

                {/* Champ pour le flag de connexion */}
                <div className="form-group">
                    <label htmlFor="flag_connexion">Flag Connexion:</label>
                    <input
                        type="text"
                        id="flag_connexion"
                        value={flag_connexion}
                        onChange={(e) => setFlagConnexion(e.target.value)}
                        placeholder="Flag Connexion"
                    />
                </div>

                {/* Liste déroulante pour le type de gestion */}
                <div className="form-group">
                    <label htmlFor="code_type_gestion">Type Gestion:</label>
                    <select
                        id="code_type_gestion"
                        value={code_type_gestion}
                        onChange={(e) => setCodeTypeGestion(e.target.value)}
                        className="select-input"
                    >
                        <option value="">Sélectionner un type de gestion</option>
                        {typeGestionOptions.map(option => (
                            <option key={option.code} value={option.code}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Liste déroulante pour la fonction rôle */}
                <div className="form-group">
                    <label htmlFor="code_fonction_role">Fonction Role:</label>
                    <select
                        id="code_fonction_role"
                        value={code_fonction_role}
                        onChange={(e) => setCodeFonctionRole(e.target.value)}
                        className="select-input"
                    >
                        <option value="">Sélectionner une fonction rôle</option>
                        {fonctionRoleOptions.map(option => (
                            <option key={option.code} value={option.code}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Liste déroulante pour la fonction */}
                <div className="form-group">
                    <label htmlFor="code_fonction">Fonction:</label>
                    <select
                        id="code_fonction"
                        value={code_fonction}
                        onChange={(e) => setCodeFonction(e.target.value)}
                        className="select-input"
                    >
                        <option value="">Sélectionner une fonction</option>
                        {fonctionOptions.map(option => (
                            <option key={option.code} value={option.code}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                 {/* Liste déroulante pour le menu */}
                 <div className="form-group">
                    <label htmlFor="code_menu">Menu:</label>
                    <select
                        id="code_menu"
                        value={code_menu}
                        onChange={(e) => setCodeMenu(e.target.value)}
                        className="select-input"
                    >
                        <option value="">Sélectionner un menu</option>
                        {menuOptions.map(option => (
                            <option key={option.code} value={option.code}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Bouton de soumission */}
                <button type="submit" className="submit-button">Ajouter</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
};

export default AddUser;
