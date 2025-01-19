import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ProfileList from './Components/ProfileList';
import ProfileDetails from './Components/Profile Details';
import MapDetails from './Components/MapDetails';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Add from './Components/Admin/Add';
import Manage from './Components/Admin/Manage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  
                <Route path="/profile" element={<ProfileList />} />    
                <Route path="/details/:id" element={<ProfileDetails />} />  
                <Route path="/map/:id" element={<MapDetails />} />    
                <Route path="/admin" element={<AdminDashboard />} /> 
                <Route path="/add" element={<Add />} />  
                <Route path="/manage" element={<Manage />} />
            </Routes>
        </Router>
    );
};

export default App;
