import './App.css';
import { Navigation } from "./components/navigation";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import Landing_Page from './pages/Landing_Page';
import Sign_In from './pages/Sign_In';

const App = () => {
  return (
    <div className="App">
      <Router>
        <MainContent />
      </Router>
    </div>
  );
};

const MainContent = () => {
  const location = useLocation(); // Hook to access the current route

  return (
    <>
      {/* Render Navigation only on paths other than "/signin" */}
      {location.pathname !== '/signin' && <Navigation />}
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/signin" element={<Sign_In />} />
      </Routes>
    </>
  );
};

export default App;
