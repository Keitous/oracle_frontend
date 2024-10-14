// src/permissions.js
export const permissions = {
    administrateur: {
        dashboard: true,
        users: true,
        vehicules: true,
        destinations: true,
    },
    gestionnaire: {
        dashboard: true,
        users: false,
        vehicules: true,
        destinations: false,
    },
    utilisateur: {
        dashboard: true,
        users: false,
        vehicules: false,
        destinations: true,
    }
};
