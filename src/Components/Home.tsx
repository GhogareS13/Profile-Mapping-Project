import * as React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="container">
            <nav className='navbar'>
            <div className="nav-heading">Profile Mapping</div>
                <ul className='nav'>
                    <li><Link to='/home'>About</Link></li>
                    <li><Link to='/profile'>Profile List</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                </ul>
               
            </nav>
            <div className="content" style={{ textAlign: 'center', padding: '20px' }}>
  <h1>Welcome to ProfileMap</h1>
  <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', fontSize: '16px' }}>
    Your comprehensive profile management and visualization platform. Our application offers an
     intuitive way to explore and manage user profiles while providing seamless geographic
      visualization of their locations. Whether you're browsing through profile cards, 
      searching for specific individuals, or visualizing their locations on an interactive map,
       our platform makes it effortless to connect people with places.
  </p>
  <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', fontSize: '16px' }}>
    With advanced features for both users and administrators, including real-time profile management, 
    detailed profile views, and interactive mapping capabilities, ProfileMap transforms
     the way you interact with and manage profile information. Experience the perfect blend of 
     user-friendly design and powerful functionality, all optimized for access across any device.
  </p>
</div>

        </div>
    );
};

export default Home;
