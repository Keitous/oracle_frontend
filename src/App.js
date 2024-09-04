// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home'; 
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import AddUser from './components/AddUser';  
import EditUser from './components/EditUser';
import VehiculeManagement from './components/VehiculeManagement';
import DashboardVehicule from './components/DashboardVehicule';
import DashboardUser from './components/DashboardUser';
import DashboardTicket from './components/DashboardTicket';
import DashboardDestination from './components/DashboardDestination';
import DashboardReport from './components/DashboardReport';
import AddVehicule from './components/AddVehicule'; 
import EditVehicule from './components/EditVehicule'; 
import VehiculeList from './components/VehiculeList'; 
import DestinationManagement from './components/DestinationManagement'; 
import AddDestination from './components/AddDestination'; 
import EditDestination from './components/EditDestination'; 
import DestinationList from './components/DestinationList';
import TicketManagement from './components/TicketManagement'; 
import AddTicket from './components/AddTicket'; 
import EditTicket from './components/EditTicket'; 
import TicketList from './components/TicketList';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Système de Gestion Électronique des Tickets de Voyage</h1>
        </header>
        
        <Routes>
          {/* Route publique pour la connexion */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirection de la route de base vers la connexion */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Routes protégées par PrivateRoute */}
          <Route path="/dashboard" element={<PrivateRoute element={Home} />} />

          <Route path="/dashboarduser" element={<PrivateRoute element={DashboardUser} />} />
          <Route path="/users" element={<PrivateRoute element={UserManagement} />} />
          <Route path="/add" element={<PrivateRoute element={AddUser} />} />
          <Route path="/edit/:nom_acces" element={<PrivateRoute element={EditUser} />} />

          <Route path="/dashboardvehicule" element={<PrivateRoute element={DashboardVehicule} />} />
          <Route path="/vehicules" element={<PrivateRoute element={VehiculeManagement} />} />
          <Route path="/add-vehicule" element={<PrivateRoute element={AddVehicule} />} />
          <Route path="/vehicule-list" element={<PrivateRoute element={VehiculeList} />} />
          <Route path="/edit-vehicule/:code_vehicule" element={<PrivateRoute element={EditVehicule} />} />
          
          <Route path="/dashboarddestination" element={<PrivateRoute element={DashboardDestination} />} />
          <Route path="/destinations" element={<PrivateRoute element={DestinationManagement} />} />
          <Route path="/add-destination" element={<PrivateRoute element={AddDestination} />} />
          <Route path="/destination-list" element={<PrivateRoute element={DestinationList} />} />
          <Route path="/edit-destination/:code_destination" element={<PrivateRoute element={EditDestination} />} />
          
          <Route path="/dashboardticket" element={<PrivateRoute element={DashboardTicket} />} />
          <Route path="/tickets" element={<PrivateRoute element={TicketManagement} />} />
          <Route path="/add-ticket" element={<PrivateRoute element={AddTicket} />} />
          <Route path="/ticket-list" element={<PrivateRoute element={TicketList} />} />
          <Route path="/edit-ticket/:code_destination" element={<PrivateRoute element={EditTicket} />} />
          
          <Route path="/dashboardreport" element={<PrivateRoute element={DashboardReport} />} />
          <Route path="/reports" element={<PrivateRoute element={DestinationManagement} />} />
          <Route path="/add-report" element={<PrivateRoute element={AddDestination} />} />
          <Route path="/report-list" element={<PrivateRoute element={DestinationList} />} />
          <Route path="/edit-report/:code_destination" element={<PrivateRoute element={EditDestination} />} />
          
          {/* Route publique pour la déconnexion */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
