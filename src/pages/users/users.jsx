import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/users/userActions';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './users.css'; // Importing the custom CSS file

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate from React Router

  const { users, loading, error } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [open, setOpen] = useState(false); // Modal state
  const [selectedUserBabies, setSelectedUserBabies] = useState([]); // To store the babies of the selected user

  const handleRowClick = (babies) => {
    setSelectedUserBabies(babies || []); // Set babies or an empty array
    setOpen(true); // Open the modal
  };

  const handleClose = () => setOpen(false);

  // Function to handle individual baby access
  const handleAccessBaby = (baby) => {
    // Navigate to the baby's analysis results page
    navigate(`/baby/${baby._id}/analysis`);
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      const filtered = searchQuery
        ? users.filter((user) =>
            user.username?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : users;

      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const columns = [
    {
      field: 'username',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon style={{ marginRight: '10px', color: '#ff6347' }} />
          {params.row.username}
        </div>
      ),
    },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'babies',
      headerName: 'Babies',
      width: 200,
      renderCell: (params) => {
        const babies = params.row.babies;
        return babies && babies.length > 0 ? (
          <Button
            variant="contained"
            style={{
              backgroundColor: '#20b2aa',
              color: 'white',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease-in-out',
            }}
            onClick={() => handleRowClick(babies)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            View {babies.length} Babies
          </Button>
        ) : (
          'No babies'
        );
      },
    },
  ];

  return (
    <div className="container">
      <h2 className="title">User Management</h2>

      <input
        type="text"
        className="search-input"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="data-grid-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <DataGrid
            rows={filteredUsers || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            className="data-grid"
            disableSelectionOnClick
            getRowId={(row) => row.id || row._id}
          />
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Modal to display baby details */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#ff6347' }}>
            Baby Details
          </Typography>
          <div className="baby-cards-container">
            {selectedUserBabies.length > 0 ? (
              selectedUserBabies.map((baby) => (
                <Card key={baby._id} className="baby-card">
                  <CardContent>
                    <Typography variant="h6" component="div" style={{ color: '#ff6347' }}>
                      {baby.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {baby.gender}, {new Date(baby.birthdate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      style={{
                        backgroundColor: '#ff6347',
                        color: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'box-shadow 0.3s ease-in-out',
                      }}
                      onClick={() => handleAccessBaby(baby)}
                      startIcon={<BabyChangingStationIcon />}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      Access Baby
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <Typography>No baby data available.</Typography>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Users;
