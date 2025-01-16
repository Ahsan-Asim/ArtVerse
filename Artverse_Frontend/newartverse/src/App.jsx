// App.jsx
import './App.css';
import { Navigation } from "./components/navigation";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing_Page from './pages/Landing_Page';
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing_Page />} /> {/* Use the Landing Page component here */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
