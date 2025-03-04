import './App.css';
import { Navigation } from "./components/navigation.jsx";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import { GoogleOAuthProvider } from "@react-oauth/google";
import Landing_Page from './pages/Landing_Page';
import Sign_In from './pages/Sign_In';
import Sign_Up from './pages/Sign_Up';
import HomePage from './pages/home_page';
import Profile from './pages/profile';
import Service_Page from './pages/Service_Page';
import ImageSearch from './pages/Image_search'
import CustomizePage from './pages/customize_page.jsx';
import Paintings_Market from './pages/Paintings_Market.jsx'
const App = () => {
  return (
    <GoogleOAuthProvider clientId="868206158931-8u3ftrs4ekvg4jitiu02bab01n5hj7q9.apps.googleusercontent.com">
    <div className="App">
      <Router>
        <MainContent />
      </Router>
    </div>
    </GoogleOAuthProvider>
  );
};

const MainContent = () => {
  const location = useLocation(); // Hook to access the current route

  return (
    <>
      {/* Render Navigation only on paths other than "/signin" */}
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/signin" element={<Sign_In />} />
        <Route path="/signup" element={<Sign_Up />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/image_search" element={<ImageSearch />} />
        <Route path="/customize/:serviceId" element={<CustomizePage />} />
        <Route path="/services" element={<Service_Page />} />
        <Route path="/Paintings_Market" element={<Paintings_Market />} />

      </Routes>
    </>
  );
};

export default App;
