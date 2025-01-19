import React, { BaseSyntheticEvent, useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import '../Home.css';
import { Button, TextField, Container, Typography, Card, CardContent, Link, Breadcrumbs, Grid2 } from "@mui/material";

interface Profile {
  id: number;
  name: string;
  description: string;
  photo: string;
  latitude: number;
  longitude: number;
}

const Add = () => {
  const [errors, setErrors] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({
    id: 0, name: "", photo: "", longitude: 0, latitude: 0, description: ""
  });

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile, [name]: value
    }));
  };

  const validateData = () => {
    const { name, description, photo, id, longitude, latitude } = profile;
    if (!name || !description || !photo || !id || !longitude || !latitude) {
      setErrors("All fields are required");
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (validateData()) {
      return;
    }

    const profileExists = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/profiles/${profile.id}`);
        return response.data.exists;
      } catch (error) {
        return false;
      }
    };

    const exists = await profileExists();
    if (exists) {
      alert("Profile id already exists");
      return;
    }
    handleSubmitApi();
  };

  const handleSubmitApi = () => {
    console.log("Profile Details:", profile);
    axios.post("http://localhost:3000/profiles", { ...profile })
      .then((result) => {
        console.log(result);
        alert("Profile added successfully");
        setProfile({
          id: 0, name: "", photo: "", longitude: 0, latitude: 0, description: ""
        });
      })
      .catch(() => {
        alert("Failed to add");
      });
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

      <Container maxWidth="md" sx={{ height: '100vh', padding: 10,alignContent:'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/admin">Dashboard</Link>
          <Typography color="textPrimary">Add Profile</Typography>
        </Breadcrumbs>
        <Card className="card-style" sx={{ height: '85vh', padding: 2}}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Add Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={4}>
                <Grid2 item xs={12} sm={4}>
                  <TextField
                    label="Id"
                    name="id"
                    fullWidth
                    type="number"
                    value={profile.id}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
                <Grid2 item xs={12} sm={4}>
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
                <Grid2 item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={3}
                    value={profile.description}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
                <Grid2 item xs={12} sm={4}>
                  <TextField
                    label="Longitude"
                    type="number"
                    name="longitude"
                    fullWidth
                    value={profile.longitude}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
                <Grid2 item xs={12} sm={4}>
                  <TextField
                    label="Latitude"
                    type="number"
                    name="latitude"
                    fullWidth
                    value={profile.latitude}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
                <Grid2 item xs={12} sm={4}>
                  <TextField
                    label="Photo URL"
                    type="text"
                    name="photo"
                    fullWidth
                    value={profile.photo}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
              </Grid2>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                align="center"
                sx={{ marginTop: 2 }}
              >
                Add Profile
              </Button>
            </form>
            {errors && <Typography color="error" align="center">{errors}</Typography>}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Add;
