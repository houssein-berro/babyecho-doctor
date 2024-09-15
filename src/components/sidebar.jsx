import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import {
  Dashboard,
  AccountCircle,
  ExitToApp,
  ChevronLeft,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './sidebar.css';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate(); // Initialize navigate function for routing

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/'); // Redirect to login page
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{
        paper: 'drawer-paper',
      }}
    >
      <div className="drawer-header">
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        {/* Dashboard Link */}
        <ListItem button onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <Dashboard className="icon" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Users Link */}
        <ListItem button onClick={() => navigate('/patients')}>
          <ListItemIcon>
            <AccountCircle className="icon" />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        {/* Logout Link */}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp className="icon" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
