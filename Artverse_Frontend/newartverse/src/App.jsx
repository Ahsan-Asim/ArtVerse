// import './App.css';
// import { Navigation } from "./components/navigation.jsx";
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { Provider } from "react-redux";  
// import store from "./Redux_store/Store.js";  
// import { WalletProvider } from "./context/WalletContext"; 
// import { CartProvider } from "./context/CartContext"; 

// import Landing_Page from './pages/Landing_Page';
// import Sign_In from './pages/Sign_In';
// import Sign_Up from './pages/Sign_Up';
// import HomePage from './pages/home_page';
// import Profile from './pages/profile';
// import Service_Page from './pages/Service_Page';
// import ImageSearch from './pages/Image_search';
// import CustomizePage from './pages/customize_page.jsx';
// import Notification from './pages/Notification.jsx';
// import RequestDetails from './pages/RequestDetails.jsx';
// import Commission from './pages/CommissionRequests.jsx';
// import ArtistProfile from './pages/ArtistProfile.jsx';
// import Paintings_Market from './pages/Paintings_Market.jsx';
// import Specific_Painting_Page from './pages/Specific_Painting_Page.jsx';
// import SearchPage from './pages/Search_page.jsx';
// import About_Us from './pages/About_Us.js';
// import NotFoundPage from './pages/Page_Not_Found.js';
// import Become_Artist from './pages/Become_Artist.js';
// import Artist_studio from './pages/Artist_studio.js';
// import Upload_Artwork from './pages/Upload_Artwork.js';
// import CartPage from './pages/CartPage.js';
// import ProtectedAuthRoute from './pages/ProtectedAuthRoute.jsx'; 
// import Artist_detail from './pages/Artist_detail.js';

// import Navbar from "./components/Navbar/Navbar";
// import ArtGallery from "./components/ArtGallery/ArtGallery";
// import Minting from "./components/Minting/Minting";
// import NftHome from "./components/Home/Home";
// import Checkout from "./components/Checkout/Checkout";
// import MyNFTs from "./components/MyNFTs/MyNFTs";

// const App = () => {
//   return (
//     <GoogleOAuthProvider clientId="868206158931-8u3ftrs4ekvg4jitiu02bab01n5hj7q9.apps.googleusercontent.com">
//       <Provider store={store}> 
//         <WalletProvider>
//           <CartProvider> {/* Move CartProvider here to wrap all components */}
//             <div className="App">
//               <Router>
//                 <MainContent />
//               </Router>
//             </div>
//           </CartProvider>
//         </WalletProvider>
//       </Provider>
//     </GoogleOAuthProvider>
//   );
// };

// const MainContent = () => {
//   const location = useLocation();

//   return (
//     <>
//       <Routes>
//         <Route
//           path="/signin"
//           element={
//             <ProtectedAuthRoute>
//               <Sign_In />
//             </ProtectedAuthRoute>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <ProtectedAuthRoute>
//               <Sign_Up />
//             </ProtectedAuthRoute>
//           }
//         />
//         <Route path="/" element={<Landing_Page />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/image_search" element={<ImageSearch />} />
//         <Route path="/customize/:serviceId" element={<CustomizePage />} />
//         <Route path="/services" element={<Service_Page />} />
//         <Route path="/Notification" element={<Notification />} />
//         <Route path="/Commission" element={<Commission />} />
//         <Route path="/request-details/:notificationId" element={<RequestDetails />} />
//         <Route path="/artist-details/:email" element={<ArtistProfile />} />
//         <Route path="/Paintings_Market" element={<Paintings_Market />} />
//         <Route path="/Painting" element={<Specific_Painting_Page />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/About_Us" element={<About_Us />} />
//         <Route path="/become-artist" element={<Become_Artist />} />
//         <Route path="/Artist_studio" element={<Artist_studio />} />
//         <Route path="/Upload_Artwork" element={<Upload_Artwork />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/artist_detail" element={<Artist_detail />} />
//         <Route path="/NftHome" element={<NftHome />} />

//         <Route path="/gallery" element={<ArtGallery />} />
//         <Route path="/mint" element={<Minting />} />

//         {/* Wrap Checkout inside CartProvider */}
//         <Route path="/checkout" element={<Checkout />} />

//         <Route path="/my-nfts" element={<MyNFTs />} />
//         <Route path="/Navbar" element={<Navbar />} />

        
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </>
//   );
// };

// export default App;



import './App.css';
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
          <CartProvider> 
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

  // Define routes where the Navbar should be shown
  const includedRoutes = ["/NftHome", "/gallery", "/mint", "/checkout", "/my-nfts"];

  return (
    <>
      {/* Show Navbar only on specific routes */}
      {includedRoutes.includes(location.pathname) && <Navbar />}

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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-nfts" element={<MyNFTs />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
