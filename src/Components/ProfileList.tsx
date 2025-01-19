import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
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
  const [searchQuery, setSearchQuery] = useState<string>(''); // Store the search query
  const navigate = useNavigate();

  // Fetch profiles from the API
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

  // Navigate to profile detail page
  const handleClick = (id: number) => {
    navigate(`/details/${id}`); // Pass the profile id to navigate
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
      setFilteredProfiles(removeDuplicates(filtered)); // Filter and remove duplicates
    } else {
      setFilteredProfiles(data); // Show all profiles if search is empty
    }
  };

  return (
    <Box sx={{ padding: '0 0' ,width:'100%',height:'100%'}}>
      <Box
        sx={{
          backgroundColor: 'rgb(79, 193, 238)', 
          padding: '16px', 
          
          marginBottom: 2, 
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}
      >

        <Typography variant="h5" sx={{ 
          marginRight: 2,
          color:'white',
          fontWeight:'bold',
          flexGrow: 1,
          textAlign: 'center',
          fontSize: '32px'

           }}>
          List of Profiles
        </Typography>
        <Box sx={{ marginLeft: 'auto' }}>
          <Search onSearch={handleSearch} searchQuery={searchQuery} />
        </Box>
      </Box>

      {/* Profile Cards */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width:'100%',
          height:'100%'
        }}
      >
        {filteredProfiles.map((profile) => (
          <Card
            key={profile.id}
            sx={{
              width: '280px',
              height: '400px',
              margin: 2,
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
                justifyContent: 'flex-end',
                textAlign: 'center',
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
