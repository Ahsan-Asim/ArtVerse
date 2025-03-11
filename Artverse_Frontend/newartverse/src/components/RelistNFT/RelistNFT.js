import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../context/WalletContext';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../../config/contract';
import './RelistNFT.css';

function RelistNFT({ nft, onClose, onSuccess }) {
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { isConnected } = useWallet();

  const handlePriceChange = (e) => {
    // Allow only numbers and decimals
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!price || parseFloat(price) <= 0) {
      setError("Please enter a valid price greater than 0");
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      if (!isConnected) {
        throw new Error('Wallet is not connected');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );

      // Convert price to wei
      const priceInWei = ethers.utils.parseEther(price);

      // List NFT for sale
      const listTx = await nftContract.listNFT(nft.id, priceInWei);
      
      // Wait for transaction to be mined
      await listTx.wait();
      
      setSuccess(true);
      
      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess();
      }, 2000);
      
    } catch (err) {
      console.error('Error listing NFT:', err);
      setError(`Failed to list NFT: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relist-modal-overlay" onClick={onClose}>
      <div className="relist-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        <div className="relist-modal-content">
          <h2>List NFT for Sale</h2>
          
          <div className="nft-preview">
            <div className="nft-preview-image">
              <img src={nft.image} alt={nft.name} />
            </div>
            <div className="nft-preview-details">
              <h3>{nft.name}</h3>
              <p className="nft-id">ID: #{nft.id}</p>
            </div>
          </div>
          
          {success ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>NFT Listed Successfully!</h3>
              <p>Your NFT is now available for purchase in the marketplace.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="price">Price (ETH)</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="0.05"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-info">
                <p>
                  <strong>Note:</strong> There will be a 2.5% marketplace fee when your NFT sells.
                </p>
                <p>
                  By listing this NFT, you're granting permission to Artverse marketplace to sell this item on your behalf.
                </p>
              </div>
              
              <button 
                type="submit" 
                className="listing-btn" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  "List NFT"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default RelistNFT;