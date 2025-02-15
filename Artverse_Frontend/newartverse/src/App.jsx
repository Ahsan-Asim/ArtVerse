import './App.css';
import { Navigation } from "./components/navigation";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import { GoogleOAuthProvider } from "@react-oauth/google";

import Landing_Page from './pages/Landing_Page';
import Sign_In from './pages/Sign_In';
import Sign_Up from './pages/Sign_Up';
import Image_search from './pages/Image_search.jsx';

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
      {location.pathname !== '/signin' && location.pathname !== '/signup' && <Navigation />}
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/signin" element={<Sign_In />} />
        <Route path="/signup" element={<Sign_Up />} />
        <Route path="/image_search" element={<Image_search />} />
      </Routes>
    </>
  );
};

export default App;
