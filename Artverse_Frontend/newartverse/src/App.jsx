import './App.css';
import { Navigation } from "./components/navigation.jsx";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";  
import store from "./Redux_store/Store.js";  
import { WalletProvider } from "./context/WalletContext"; 
import { CartProvider } from "./context/CartContext"; 

import Landing_Page from './pages/Landing_Page';
import Sign_In from './pages/Sign_In';
import Sign_Up from './pages/Sign_Up';
import HomePage from './pages/home_page';
import Profile from './pages/profile';
import Service_Page from './pages/Service_Page';
import ImageSearch from './pages/Image_search';
import CustomizePage from './pages/customize_page.jsx';
import Notification from './pages/Notification.jsx';
import RequestDetails from './pages/RequestDetails.jsx';
import Commission from './pages/CommissionRequests.jsx';
import ArtistProfile from './pages/ArtistProfile.jsx';
import Paintings_Market from './pages/Paintings_Market.jsx';
import Specific_Painting_Page from './pages/Specific_Painting_Page.jsx';
import SearchPage from './pages/Search_page.jsx';
import About_Us from './pages/About_Us.js';
import NotFoundPage from './pages/Page_Not_Found.js';
import Become_Artist from './pages/Become_Artist.js';
import Artist_studio from './pages/Artist_studio.js';
import Upload_Artwork from './pages/Upload_Artwork.js';
import CartPage from './pages/CartPage.js';
import ProtectedAuthRoute from './pages/ProtectedAuthRoute.jsx'; 
import Artist_detail from './pages/Artist_detail.js';

import Navbar from "./components/Navbar/Navbar";
import ArtGallery from "./components/ArtGallery/ArtGallery";
import Minting from "./components/Minting/Minting";
import NftHome from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import MyNFTs from "./components/MyNFTs/MyNFTs";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="868206158931-8u3ftrs4ekvg4jitiu02bab01n5hj7q9.apps.googleusercontent.com">
      <Provider store={store}> 
        <WalletProvider>
          <CartProvider> {/* Move CartProvider here to wrap all components */}
            <div className="App">
              <Router>
                <MainContent />
              </Router>
            </div>
          </CartProvider>
        </WalletProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

const MainContent = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route
          path="/signin"
          element={
            <ProtectedAuthRoute>
              <Sign_In />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedAuthRoute>
              <Sign_Up />
            </ProtectedAuthRoute>
          }
        />
        <Route path="/" element={<Landing_Page />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/image_search" element={<ImageSearch />} />
        <Route path="/customize/:serviceId" element={<CustomizePage />} />
        <Route path="/services" element={<Service_Page />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Commission" element={<Commission />} />
        <Route path="/request-details/:notificationId" element={<RequestDetails />} />
        <Route path="/artist-details/:email" element={<ArtistProfile />} />
        <Route path="/Paintings_Market" element={<Paintings_Market />} />
        <Route path="/Painting" element={<Specific_Painting_Page />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/About_Us" element={<About_Us />} />
        <Route path="/become-artist" element={<Become_Artist />} />
        <Route path="/Artist_studio" element={<Artist_studio />} />
        <Route path="/Upload_Artwork" element={<Upload_Artwork />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/artist_detail" element={<Artist_detail />} />
        <Route path="/NftHome" element={<NftHome />} />

        <Route path="/gallery" element={<ArtGallery />} />
        <Route path="/mint" element={<Minting />} />

        {/* Wrap Checkout inside CartProvider */}
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/my-nfts" element={<MyNFTs />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;



// export default App;
// import './App.css';
// // import { Navigation } from "./components/navigation";
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { WalletProvider } from "./context/WalletContext";
// import { CartProvider } from "./context/CartContext";
// import { useEffect } from 'react';

// // Import pages from new app
// import Landing_Page from './pages/Landing_Page';
// import Sign_In from './pages/Sign_In';
// import Sign_Up from './pages/Sign_Up';
// import Image_search from './pages/Image_search.jsx';

// // Import components from old app
// import Navbar from "./components/Navbar/Navbar";
// import ArtGallery from "./components/ArtGallery/ArtGallery";
// import Minting from "./components/Minting/Minting";
// import NftHome from "./components/Home/Home";
// import Checkout from "./components/Checkout/Checkout";
// import MyNFTs from "./components/MyNFTs/MyNFTs";

// // Auto login configuration
// const AUTO_LOGIN = true; // Set to false to disable auto-login

// const App = () => {
//   return (
//     <GoogleOAuthProvider clientId="868206158931-8u3ftrs4ekvg4jitiu02bab01n5hj7q9.apps.googleusercontent.com">
//       <WalletProvider>
//         <CartProvider>
//           <div className="App">
//             <Router>
//               <MainContent />
//             </Router>
//           </div>
//         </CartProvider>
//       </WalletProvider>
//     </GoogleOAuthProvider>
//   );
// };

// const MainContent = () => {
//   const location = useLocation();
//   const showNavigation = !['/signin', '/signup'].includes(location.pathname);
//   const showNavbar = ['/gallery', '/mint', '/checkout', '/my-nfts'].includes(location.pathname);

//   // Auto login effect
//   useEffect(() => {
//     if (AUTO_LOGIN) {
//       // Set a mock user in localStorage
//       const mockUser = {
//         id: "mock123",
//         name: "Test User",
//         email: "test@example.com",
//         isLoggedIn: true
//       };
//       localStorage.setItem('user', JSON.stringify(mockUser));
      
//       // You might need to set other auth-related data
//       localStorage.setItem('token', 'mock-jwt-token');
//     }
//   }, []);
  
//   // If auto-login is enabled and we're on signin/signup pages, redirect to home
//   if (AUTO_LOGIN && ['/signin', '/signup'].includes(location.pathname)) {
//     return <Navigate to="/NftHome" replace />;
//   }

//   return (
//     <>
//       {/* {showNavigation && !showNavbar && <Navigation />} */}
//       {showNavbar && <Navbar />}
//       <Routes>
//         {/* Routes from new app */}
//         <Route path="/" element={<Landing_Page />} />
//         <Route path="/signin" element={<Sign_In />} />
//         <Route path="/signup" element={<Sign_Up />} />
//         <Route path="/image_search" element={<Image_search />} />
        
//         {/* Routes from old app */}
//         <Route path="/NftHome" element={<NftHome />} />
//         <Route path="/gallery" element={<ArtGallery />} />
//         <Route path="/mint" element={<Minting />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/my-nfts" element={<MyNFTs />} />
//       </Routes>
//     </>
//   );
// };

// export default App;