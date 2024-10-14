// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [login, setLogin] = useState(''); // Stocke le login de l'utilisateur
    const [defaultPassword, setDefaultPassword] = useState(''); // Stocke le mot de passe par défaut pour la première connexion
    const [newPassword, setNewPassword] = useState(''); // Stocke le nouveau mot de passe saisi
    const [confirmPassword, setConfirmPassword] = useState(''); // Stocke la confirmation du nouveau mot de passe
    const [error, setError] = useState(''); // Stocke les messages d'erreur
    const [isFirstLogin, setIsFirstLogin] = useState(false); // Indique si c'est la première connexion de l'utilisateur
    const navigate = useNavigate(); // Hook pour naviguer entre les pages

    // useEffect pour vérifier si c'est la première connexion lorsque le login change
    useEffect(() => {
        const checkFirstLogin = async () => {
            try {
                if (login) {
                    const response = await axios.get(`http://localhost:3001/api/check-first-login/${login}`);
                    setIsFirstLogin(response.data.isFirstLogin); // Mise à jour du statut de première connexion
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de la première connexion:', error);
            }
        };

        checkFirstLogin();
    }, [login]);

    // Fonction pour gérer la soumission du formulaire de connexion
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Gestion de la première connexion
        if (isFirstLogin) {
            if (!login || !defaultPassword || !newPassword || !confirmPassword) {
                setError('Veuillez remplir tous les champs.');
                return;
            }

            if (newPassword !== confirmPassword) {
                setError('Les mots de passe ne correspondent pas.');
                return;
            }

            try {
                const response = await axios.post('http://localhost:3001/api/login', {
                    login,
                    defaultPassword,
                    newPassword
                });

                if (response.data.success) {
                    // Mise à jour du mot de passe après la première connexion
                    const updateResponse = await axios.post('http://localhost:3001/api/update-password', {
                        login,
                        newPassword
                    });

                    if (updateResponse.data.message === 'Mot de passe mis à jour avec succès') {
                        localStorage.setItem('authToken', response.data.token);
                        fetchUserDetails(); // Récupère les détails de l'utilisateur (y compris le rôle)
                    } else {
                        setError(updateResponse.data.message || 'Erreur lors de la mise à jour du mot de passe.');
                    }
                } else {
                    setError('Mot de passe par défaut incorrect.');
                }
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
                setError('Une erreur est survenue. Veuillez réessayer plus tard.');
            }
        } else {
            // Gestion des connexions normales
            if (!login || !newPassword) {
                setError('Veuillez remplir tous les champs.');
                return;
            }

            try {
                const response = await axios.post('http://localhost:3001/api/login', {
                    login,
                    password: newPassword
                });

                if (response.data.success) {
                    localStorage.setItem('authToken', response.data.token);
                    fetchUserDetails(); // Récupère les détails de l'utilisateur (y compris le rôle)
                } else {
                    setError('Nom d\'utilisateur ou mot de passe incorrect.');
                }
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
                setError('Une erreur est survenue. Veuillez réessayer plus tard.');
            }
        }
    };

    // Fonction pour récupérer les détails de l'utilisateur après connexion
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/${login}`);
            const userRole = response.data.role;
            console.log('Rôle utilisateur récupéré:', userRole); // Vérification du rôle récupéré
            redirectUserBasedOnRole(userRole); // Redirige l'utilisateur selon son rôle
        } catch (error) {
            console.error('Erreur lors de la récupération des détails utilisateur:', error);
            setError('Une erreur est survenue lors de la récupération des détails utilisateur.');
        }
    };

    // Fonction pour rediriger l'utilisateur en fonction de son rôle
    const redirectUserBasedOnRole = (role) => {
        switch (role) {
            case 'users':
                navigate('/dashboarduser'); // Redirige vers la gestion des utilisateurs
                break;
            case 'vehicules':
                navigate('/dashboardvehicule'); // Redirige vers la gestion des véhicules
                break;
            case 'destinations':
                navigate('/dashboarddestination'); // Redirige vers la gestion des destinations
            break;
            case 'tickets':
                navigate('/dashboardticket'); // Redirige vers la gestion des tickets
                break;
            case 'reports':
                navigate('/dashboardreport'); // Redirige vers la gestion des editions et statistiques
            break;
            case 'admin':
                navigate('/dashboard'); // Redirige vers le panneau d'administration
                break;
            default:
                console.error('Rôle non reconnu:', role); // Ajout d'un log pour les rôles non reconnus
                setError('Rôle utilisateur non reconnu.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Connexion</h2>
                <div>
                    <label htmlFor="login">Login:</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                {isFirstLogin ? (
                    <>
                        <div>
                            <label htmlFor="defaultPassword">Mot de passe par défaut:</label>
                            <input
                                type="password"
                                id="defaultPassword"
                                value={defaultPassword}
                                onChange={(e) => setDefaultPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword">Nouveau mot de passe:</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmez le nouveau mot de passe:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <label htmlFor="password">Mot de passe:</label>
                        <input
                            type="password"
                            id="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                {error && <div className="error">{error}</div>}
                <div className="button-container">
                    <button type="submit">Se connecter</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
