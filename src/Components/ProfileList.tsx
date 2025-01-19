import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';

interface ProfileList {
  id: number;
  name: string;
  photo: string;
}

const ProfileList = () => {
  const [data, setData] = useState<ProfileList[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<ProfileList[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/profiles')
      .then((res) => {
        const uniqueProfiles = removeDuplicates(res.data);
        setData(uniqueProfiles);
        setFilteredProfiles(uniqueProfiles);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (id: number) => {
    navigate(`/details/${id}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  const removeDuplicates = (profiles: ProfileList[]): ProfileList[] => {
    const uniqueProfiles = new Map();
    profiles.forEach((profile) => {
      if (!uniqueProfiles.has(profile.id)) {
        uniqueProfiles.set(profile.id, profile);
      }
    });
    return Array.from(uniqueProfiles.values());
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = data.filter((profile) =>
        profile.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProfiles(removeDuplicates(filtered));
    } else {
      setFilteredProfiles(data);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: 'rgb(79, 193, 238)',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100vw',
          boxSizing: 'border-box',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            flexGrow: 1,
            textAlign: 'center',
            fontSize: '32px',
            marginLeft: '20px'
          }}
        >
          List of Profiles
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          marginRight: '20px'
        }}>
          <Search onSearch={handleSearch} searchQuery={searchQuery} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
          >
            Back
          </Button>
        </Box>
      </Box>

      {/* Profile Cards Container */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: 'white',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          width: '100vw',
          boxSizing: 'border-box',
        }}
      >
        {filteredProfiles.map((profile) => (
          <Card
            key={profile.id}
            sx={{
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleClick(profile.id)}
          >
            <CardMedia
              component="img"
              height="300"
              image={profile.photo}
              alt={profile.name}
              loading="lazy"
            />
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <Typography variant="h6" component="div" noWrap>
                {profile.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileList;