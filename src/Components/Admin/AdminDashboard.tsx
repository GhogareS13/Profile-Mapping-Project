import { Link, useNavigate } from "react-router-dom";
import '../Home.css';
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

interface Profile {
  id: number;
  name: string;
  photo: string;
}

const AdminDashboard = () => {
  const [data, setData] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();

  // Fetch profiles from the API
  useEffect(() => {
    axios
      .get('http://localhost:3000/profiles')
      .then((res) => {
        setData(res.data); // Store fetched data
        setFilteredProfiles(res.data); // Initialize filtered profiles
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <nav className='navbar'>
        <div className="nav-heading">Profile Mapping</div>
        <ul className='nav'>
          <li><Link to='/add'>Add Profiles</Link></li>
          <li><Link to='/manage'>Manage Profiles</Link></li>
          <li><Link to='/home'>Home</Link></li>
        </ul>
      </nav>

      <div className="content">
      

      <Box sx={{ padding: '10px 10px' 
         
      }}>
        <Box
          sx={{
            padding: '10px',
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            width:'100%',
            height:'100%',
            
          }}
        >
          <Typography variant="h5" sx={{
            marginRight: 2,
            color: 'white',
            fontWeight: 'bold',
            flexGrow: 1,
            textAlign: 'center',
            fontSize: '32px'
          }}>
            List of Profiles
          </Typography>

        {/* Profile Cards */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems:'center',
            
            
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
      </ Box>
    </div>
    </div>
  );
};

export default AdminDashboard;
