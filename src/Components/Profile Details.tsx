import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';

// Define the Profile interface
interface Profile {
  id: number;
  name: string;
  description: string;
  photo: string;
  latitude:number;
  longitude:number;
  contact:string;
  interests:string[];
}

const getProfileById = async (id: string): Promise<Profile> => {
  const response = await fetch(`http://localhost:3000/profiles/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data as Profile;
};

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (id) {
          const fetchedProfile = await getProfileById(id);
          setProfile(fetchedProfile); // Set the fetched profile data
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>; 
  }

  const handleClick = () => {
    if (profile.latitude && profile.longitude) {
      navigate(`/map/${profile.id}`, {
        state: {
          latitude: profile.latitude,
          longitude: profile.longitude,
        },
      });
    }
  };
  const handleBack = () => {
      navigate('/profile');
      }

return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgb(79, 193, 238)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height:'100%',
          maxWidth: '300px',
          maxHeight:'400px',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '15px',
          textAlign: 'center',
        }}
      >
         
         <img
          src={profile.photo}
          alt="Profile"
          style={{
            width: '45%',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '5px',
          }}
        />

        <Typography variant="h3" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {profile.name}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: '1.0rem' }}>
          Description : {profile.description}
        </Typography>
        <Typography variant="h3" gutterBottom sx={{ fontSize: '1.0rem'}}>
          Contact : {profile.contact}
        </Typography>
        <Typography variant="h3" gutterBottom sx={{ fontSize: '1.0rem' }}>
          Interests : {profile.interests}
        </Typography>
       
        <Button variant="contained" color="primary" onClick={handleBack} sx={{ marginTop: '10px', marginRight:'10px' }}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleClick} sx={{ marginTop: '10px' }}>
          Summary
        </Button>
      </Paper>
    </Box>
  );
};

export default ProfileDetail;
