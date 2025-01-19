import * as React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="container">
            <nav className='navbar'>
            <div className="nav-heading">Profile Mapping</div>
                <ul className='nav'>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/profile'>Profile List</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                </ul>
               
            </nav>
            <div className="content">
                <h1>Welcome to Home</h1>
                <p>This is the main content area. Contents will appear here.</p>
            </div>
        </div>
    );
};

export default Home;
