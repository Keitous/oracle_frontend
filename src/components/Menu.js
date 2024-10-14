import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
    const [userMenus, setUserMenus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserMenus = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3001/api/user-menus', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserMenus(response.data.map(menu => menu.code_menu));
                setIsLoading(false);
            } catch (err) {
                console.error('Erreur lors de la récupération des menus:', err);
                setError('Erreur lors de la récupération des menus.');
                setIsLoading(false);
            }
        };

        fetchUserMenus();
    }, []);

    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <nav>
            {userMenus.includes(1) && <a href="/home">Tableau de bord</a>}
            {userMenus.includes(2) && <a href="/users">Utilisateurs</a>}
            {userMenus.includes(3) && <a href="/vehicules">Véhicules</a>}
            {userMenus.includes(4) && <a href="/destinations">Destinations</a>}
            {/* Ajouter d'autres menus en fonction des droits d'accès */}
            <a href="/logout">Déconnexion</a>
        </nav>
    );
};

export default Menu;
