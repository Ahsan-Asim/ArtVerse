import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";
import logo from "../../assets/logo.png"; // Adjust the path to your logo file

function Navbar() {
  const { isConnected, connectWallet, walletAddress } = useWallet();
  const { cartItems, getCartTotal, removeFromCart } = useCart();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  
  const handleConnect = async () => {
    if (!isConnected) {
      await connectWallet();
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/gallery?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };
  
  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Artverse Logo" className="logo-image" /> {/* Add logo here */}
        </Link>
        
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search for NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
        
        <div className="nav-buttons">
          <Link to="/gallery" className="nav-button explore-button">
            Explore
          </Link>
          <Link to="/mint" className="nav-button mint-button">
            Create NFT
          </Link>
          {isConnected && (
            <Link to="/my-nfts" className="nav-button my-nfts-button">
              My NFTs
            </Link>
          )}
        </div>
        
        <div className="nav-actions">
          <button className="connect-wallet" onClick={handleConnect}>
            {isConnected 
              ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
              : "Connect Wallet"
            }
          </button>
          
          <div className="cart-icon" onClick={toggleCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
            
            <div className={`cart-dropdown ${cartOpen ? 'open' : ''}`}>
              <h4>Your Cart ({cartItems.length})</h4>
              
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                  <Link to="/gallery" className="continue-shopping" onClick={() => setCartOpen(false)}>
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map(item => (
                      <div className="cart-item" key={item.id}>
                        <div className="cart-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="cart-item-details">
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-price">{item.price} ETH</div>
                        </div>
                        <button 
                          className="cart-item-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>{getCartTotal()} ETH</span>
                  </div>
                  
                  <button 
                    className="checkout-btn" 
                    onClick={() => {
                      navigate('/checkout');
                      setCartOpen(false);
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;