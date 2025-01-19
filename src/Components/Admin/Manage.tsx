import { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
  Container, Typography, Card, CardContent, Breadcrumbs,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Link,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { BaseSyntheticEvent } from "react";
import '../Home.css';

interface Profile {
  id: number;
  name: string;
  description: string;
  photo: string;
  latitude: number;
  longitude: number;
}

const Manage = () => {
  const [profile, setProfile] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/profiles");
      setProfile(response.data);
    } catch (error) {
      setError('Failed to fetch profile');
      console.error("Error fetching profiles:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/profiles/${id}`);
      alert("Profile deleted successfully!");
      fetchProfiles();
    } catch (err) {
      alert("Failed to delete Profile. Please try again.");
    }
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setDescription(profile.description);  
    setName(profile.name);
    setLatitude(profile.latitude);
    setLongitude(profile.longitude);
    setDialogOpen(true);
  };

  const handleDialogSubmit = async () => {
    if (!editingProfile) return; // Ensure editingProfile is not null

    try {
      await axios.patch(`http://localhost:3000/profiles/${editingProfile.id}`, {
        name: name,
        latitude: latitude,
        longitude: longitude,
        description: description,
      });
      alert("Profile updated successfully!");
      setDialogOpen(false);
      fetchProfiles(); // Refresh profiles after update
    } catch (err) {
      alert("Failed to update Profile. Please try again.");
      setDialogOpen(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingProfile(null);
    setDescription('');
    setName('');
    setLongitude('');
    setLatitude('');
  };

  return (
    <div className="container">
      <nav className='navbar'>
        <div className="nav-heading">Profile Mapping</div>
        <ul className='nav'>
         <li><Link component={RouterLink} to='/add'>Add Profiles</Link></li>
         <li><Link component ={RouterLink} to='/manage'>Manage Profiles</Link></li>
        </ul>
      </nav>

      <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'scroll', padding: 10,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
          <Link component={RouterLink} to="/admin">Dashboard</Link>
          <Typography color="textPrimary">Manage Profiles</Typography>
        </Breadcrumbs>

        <Card sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Manage Profiles
            </Typography>

            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Photo</TableCell>
                    <TableCell>Longitude</TableCell>
                    <TableCell>Latitude</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {profile.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell>{profile.id}</TableCell>
                      <TableCell>{profile.name}</TableCell>
                      <TableCell>{profile.description}</TableCell>
                      <TableCell><img src={profile.photo} alt={profile.name} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                      </TableCell>
                      <TableCell>{profile.longitude}</TableCell>
                      <TableCell>{profile.latitude}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(profile)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(profile.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {error && <Typography color="error" align="center">{error}</Typography>}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent dividers>
            <Grid2 container spacing={2}>
              <Grid2 item xs={12}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  label="Latitude"
                  fullWidth
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  label="Longitude"
                  fullWidth
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  variant="outlined"
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </div>
  );
};

export default Manage;
