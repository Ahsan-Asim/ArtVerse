import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useWallet } from "../../context/WalletContext";
import { useCart } from "../../context/CartContext";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../../config/contract";
import "./Checkout.css";

function Checkout() {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const { isConnected, walletAddress, connectWallet } = useWallet();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [processingItems, setProcessingItems] = useState({});
  const [estimatedGas, setEstimatedGas] = useState("0.005"); // Default gas estimate
  const [walletBalance, setWalletBalance] = useState("0");
  
  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/gallery");
    }
  }, [cartItems, navigate]);
  
  // Get wallet balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected && window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getBalance(walletAddress);
          setWalletBalance(ethers.utils.formatEther(balance.toString()));
        } catch (err) {
          console.error("Error fetching wallet balance:", err);
        }
      }
    };
    
    fetchBalance();
  }, [isConnected, walletAddress]);
  
  // Estimate gas for all transactions
  useEffect(() => {
    const estimateGasFees = async () => {
      if (!isConnected || !cartItems.length) return;
      
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const gasPrice = await provider.getGasPrice();
        
        // Conservative estimate: 250,000 gas units per NFT purchase
        const gasUnitsEstimate = 250000 * cartItems.length;
        const totalGasEstimate = ethers.BigNumber.from(gasUnitsEstimate).mul(gasPrice);
        
        setEstimatedGas(ethers.utils.formatEther(totalGasEstimate));
      } catch (err) {
        console.error("Error estimating gas fees:", err);
        // Fallback to a conservative estimate
        setEstimatedGas((0.005 * cartItems.length).toFixed(5));
      }
    };
    
    estimateGasFees();
  }, [cartItems, isConnected]);
  
  const handleConnectWallet = async () => {
    await connectWallet();
  };
  
  const handlePurchase = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }
    
    // Reset states
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const totalAmount = getCartTotal();
      const requiredAmount = parseFloat(totalAmount) + parseFloat(estimatedGas);
      
      // Check if wallet has enough balance
      if (parseFloat(walletBalance) < requiredAmount) {
        setError(`Insufficient funds. You need at least ${requiredAmount.toFixed(5)} ETH (including gas).`);
        setLoading(false);
        return;
      }
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );
      
      // Process each NFT purchase sequentially
      const updatedProcessingItems = { ...processingItems };
      let successCount = 0;
      
      for (const nft of cartItems) {
        try {
          // Update UI to show processing
          updatedProcessingItems[nft.id] = "processing";
          setProcessingItems({ ...updatedProcessingItems });
          
          // Verify the NFT is still for sale
          const marketItem = await nftContract.getNFT(nft.id);
          if (!marketItem.isListed) {
            updatedProcessingItems[nft.id] = "error";
            setError(prev => prev + (prev ? "\n" : "") + `${nft.name} is no longer for sale.`);
            continue;
          }
          
          // Buy the NFT
          const price = marketItem.price;
          const buyTx = await nftContract.buyNFT(nft.id, {
            value: price
          });
          
          // Wait for transaction to be mined
          await buyTx.wait();
          
          // Mark as complete
          updatedProcessingItems[nft.id] = "complete";
          setProcessingItems({ ...updatedProcessingItems });
          successCount++;
          
        } catch (err) {
          console.error(`Error buying NFT ${nft.id}:`, err);
          updatedProcessingItems[nft.id] = "error";
          setError(prev => prev + (prev ? "\n" : "") + `Failed to buy ${nft.name}: ${err.message}`);
        }
      }
      
      // Set success if at least one item was purchased successfully
      if (successCount > 0) {
        setSuccess(true);
        // Remove successful purchases from cart
        const successfulIds = Object.entries(updatedProcessingItems)
          .filter(([_, status]) => status === "complete")
          .map(([id, _]) => id);
          
        // If all purchases were successful, clear the cart
        if (successfulIds.length === cartItems.length) {
          clearCart();
        } else {
          // Otherwise remove just the successful ones
          // This requires a removeMultipleFromCart function in your CartContext
          // You might need to implement this function
        }
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      setError(`Checkout failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const getTotalWithGas = () => {
    const subtotal = getCartTotal();
    return (parseFloat(subtotal) + parseFloat(estimatedGas)).toFixed(5);
  };
  
  if (success) {
    return (
      <div className="checkout-container">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Purchase Successful!</h2>
          <p>Your NFTs have been added to your wallet.</p>
          <div className="success-buttons">
            <button className="primary-button" onClick={() => navigate("/profile")}>
              View My NFTs
            </button>
            <button className="secondary-button" onClick={() => navigate("/gallery")}>
              Explore More Art
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="checkout-content">
        <div className="checkout-items">
          <h2>Items ({cartItems.length})</h2>
          
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div 
                key={item.id} 
                className={`checkout-item ${processingItems[item.id] ? `status-${processingItems[item.id]}` : ''}`}
              >
                <div className="checkout-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="checkout-item-details">
                  <h3>{item.name}</h3>
                  <p className="checkout-item-price">{item.price} ETH</p>
                </div>
                {processingItems[item.id] && (
                  <div className="processing-status">
                    {processingItems[item.id] === "processing" && (
                      <div className="spinner"></div>
                    )}
                    {processingItems[item.id] === "complete" && (
                      <div className="status-icon success">✓</div>
                    )}
                    {processingItems[item.id] === "error" && (
                      <div className="status-icon error">✕</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-item">
            <span>Subtotal</span>
            <span>{getCartTotal()} ETH</span>
          </div>
          
          <div className="summary-item">
            <span>Estimated Gas</span>
            <span>{estimatedGas} ETH</span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span>{getTotalWithGas()} ETH</span>
          </div>
          
          <div className="wallet-info">
            <div className="wallet-balance">
              <span>Wallet Balance</span>
              <span>{isConnected ? `${parseFloat(walletBalance).toFixed(5)} ETH` : "Not connected"}</span>
            </div>
            
            {isConnected && parseFloat(walletBalance) < (parseFloat(getCartTotal()) + parseFloat(estimatedGas)) && (
              <div className="insufficient-funds">
                <p>Insufficient funds. Please add more ETH to your wallet.</p>
              </div>
            )}
          </div>
          
          <button 
            className={`checkout-button ${loading ? 'loading' : ''} ${
              !isConnected || (isConnected && parseFloat(walletBalance) < (parseFloat(getCartTotal()) + parseFloat(estimatedGas))) 
                ? 'disabled' 
                : ''
            }`}
            onClick={!isConnected ? handleConnectWallet : handlePurchase}
            disabled={loading || (isConnected && parseFloat(walletBalance) < (parseFloat(getCartTotal()) + parseFloat(estimatedGas)))}
          >
            {loading ? (
              <>
                <div className="button-spinner"></div>
                Processing...
              </>
            ) : !isConnected ? (
              "Connect Wallet"
            ) : (
              "Complete Purchase"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
