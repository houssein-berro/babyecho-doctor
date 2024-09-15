import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/users/userActions';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Backdrop,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import './users.css';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error } = useSelector((state) => state.user);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserBabies, setSelectedUserBabies] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRowClick = (babies) => {
    setSelectedUserBabies(babies || []);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleAccessBaby = (baby) => {
    navigate(`/baby/${baby._id}/analysis`);
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      setFilteredUsers(users);
    }
  }, [users]);

  const columns = [
    {
      field: 'username',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon style={{ marginRight: '10px', color: 'var(--primary-color)' }} />
          {params.row.username}
        </div>
      ),
    },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'babies',
      headerName: 'Babies',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const babies = params.row.babies;
        return babies && babies.length > 0 ? (
          <Button
            className="button-contained"
            onClick={() => handleRowClick(babies)}
            aria-label={`View ${babies.length} Babies`}
          >
            View {babies.length} Babies
          </Button>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No babies
          </Typography>
        );
      },
    },
  ];

  return (
    <div className="container">
      <Sidebar open={drawerOpen} onClose={toggleDrawer} />
      <div className="main-content">
        <div className="menu-and-title">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            className="menu-button1"
          >
            <MenuIcon />
          </IconButton>
          <h2 className="title">Baby Management</h2>
        </div>

        <div className="data-grid-container">
          {loading ? (
            <div className="loading" role="status" aria-live="polite">
              Loading...
            </div>
          ) : (
            <DataGrid
              rows={filteredUsers || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              className="data-grid"
              disableSelectionOnClick
              getRowId={(row) => row.id || row._id}
              slots={{
                toolbar: GridToolbar,
              }}
              aria-label="User Data Grid"
            />
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          slots={{
            backdrop: Backdrop,
          }}
          slotProps={{
            backdrop: {
              timeout: 500,
              className: 'modal-overlay',
            },
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={openModal}>
            <Box className="modal-box" role="dialog" aria-modal="true">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ color: 'var(--primary-color)' }}
              >
                Baby Details
              </Typography>
              <div className="baby-cards-container">
                {selectedUserBabies.length > 0 ? (
                  selectedUserBabies.map((baby) => (
                    <div key={baby._id} className="baby-card">
                      <div className="baby-avatar">
                        {baby.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="baby-info">
                        <Typography className="baby-name">
                          {baby.name}
                        </Typography>
                        <Typography className="baby-details">
                          {baby.gender}, {new Date(baby.birthdate).toLocaleDateString()}
                        </Typography>
                      </div>
                      <Button
                        size="small"
                        className="button-contained"
                        onClick={() => handleAccessBaby(baby)}
                        startIcon={<BabyChangingStationIcon />}
                        aria-label={`Access ${baby.name}`}
                      >
                        Access Baby
                      </Button>
                    </div>
                  ))
                ) : (
                  <Typography>No baby data available.</Typography>
                )}
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Users;
