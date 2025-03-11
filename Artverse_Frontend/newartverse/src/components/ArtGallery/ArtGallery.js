import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "../../context/WalletContext";
import { useCart } from "../../context/CartContext";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, NETWORK_CONFIG } from "../../config/contract";
import "./ArtGallery.css";

function ArtGallery() {
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // recent, price-asc, price-desc
  const [filterBy, setFilterBy] = useState("all"); // all, listed, owned
  const [selectedNft, setSelectedNft] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New state for provenance history
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  
  // New state for relisting
  const [relistingPrice, setRelistingPrice] = useState("");
  const [showRelistingForm, setShowRelistingForm] = useState(false);
  
  const { isConnected, walletAddress, connectWallet } = useWallet();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(null);

  // Fetch NFTs from blockchain and IPFS
  useEffect(() => {
    const fetchNFTs = async () => {
      if (!window.ethereum) {
        setError("Please install MetaMask to view NFTs");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError("");
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const nftContract = new ethers.Contract(
          NFT_CONTRACT_ADDRESS,
          NFT_CONTRACT_ABI,
          provider
        );
        
        // Get all unsold NFTs from marketplace
        const unsoldNFTs = await nftContract.getUnsoldNFTs();
        
        // Process the NFT data
        const nftPromises = unsoldNFTs.map(async (nft) => {
          try {
            // Get token URI from contract
            const tokenURI = await nftContract.tokenURI(nft.tokenId.toString());
            
            // Convert IPFS URI to HTTP gateway URL
            const ipfsURL = tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
            
            // Fetch metadata
            const response = await fetch(ipfsURL);
            const metadata = await response.json();
            
            // Convert image IPFS URL to HTTP
            const imageURL = metadata.image?.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") || "/placeholder-image.png";
            
            return {
              id: nft.tokenId.toString(),
              name: metadata.name || `NFT #${nft.tokenId.toString()}`,
              description: metadata.description || "No description available",
              image: imageURL,
              price: ethers.utils.formatEther(nft.price || "0"),
              priceWei: nft.price?.toString() || "0",
              seller: nft.seller || "0x0", // Default value if undefined
              owner: nft.owner || "0x0",   // Default value if undefined
              isListed: nft.isListed === undefined ? false : nft.isListed,
              attributes: metadata.attributes || [],
              tokenURI: tokenURI,
              tags: metadata.tags || [],
              collection: metadata.collection || "Uncategorized"
            };
          } catch (err) {
            console.error(`Error processing NFT ${nft.tokenId.toString()}:`, err);
            return null;
          }
        });
        
        // Wait for all NFT data to be fetched
        const resolvedNfts = await Promise.all(nftPromises);
        const validNfts = resolvedNfts.filter(nft => nft !== null);
        
        setNfts(validNfts);
        setFilteredNfts(validNfts);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
        setError("Failed to load NFTs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNFTs();
  }, []);
  
  // Apply filters, search and sort
  useEffect(() => {
    let result = [...nfts];
    
    // Apply filter
    if (filterBy === "listed") {
      result = result.filter(nft => nft.isListed);
    } else if (filterBy === "owned" && isConnected) {
      result = result.filter(
        nft => nft.owner.toLowerCase() === walletAddress.toLowerCase()
      );
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        nft => 
          nft.name.toLowerCase().includes(term) ||
          nft.description.toLowerCase().includes(term) ||
          nft.collection.toLowerCase().includes(term) ||
          (nft.tags && nft.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    // Apply sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "recent") {
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
    
    setFilteredNfts(result);
  }, [nfts, searchTerm, sortBy, filterBy, isConnected, walletAddress]);

  // Handle NFT purchase
  const handleBuyNFT = async (nft) => {
    if (!isConnected) {
      await connectWallet();
      return;
    }
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );
      
      // Verify the NFT is still for sale
      const marketItem = await nftContract.getNFT(nft.id);
      if (!marketItem.isListed) {
        setError("This NFT is no longer for sale");
        return;
      }
      
      // Buy the NFT
      const price = marketItem.price;
      const buyTx = await nftContract.buyNFT(nft.id, {
        value: price
      });
      
      // Wait for transaction to be mined
      await buyTx.wait();
      
      // Show success message and refresh NFTs
      alert(`Successfully purchased ${nft.name}!`);
      window.location.reload();
      
    } catch (err) {
      console.error("Error buying NFT:", err);
      setError(err.message || "Failed to buy NFT. Please try again.");
    }
  };
  
  // Open modal with NFT details
  const openNftModal = (nft) => {
    setSelectedNft(nft);
    setIsModalOpen(true);
    fetchTransactionHistory(nft.id);
  };
  
  // Close NFT modal
  const closeNftModal = () => {
    setIsModalOpen(false);
    setSelectedNft(null);
    setTransactionHistory([]);
    setShowRelistingForm(false);
    setRelistingPrice("");
  };

  // Add function to fetch NFT transaction history
  const fetchTransactionHistory = async (tokenId) => {
    if (!tokenId) return;
    
    setLoadingHistory(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        provider
      );
      
      // Get current block number for reference
      const currentBlock = await provider.getBlockNumber();
      
      // Create filters for relevant events
      const mintFilter = nftContract.filters.NFTMinted(tokenId);
      const listFilter = nftContract.filters.NFTListed(tokenId);
      const saleFilter = nftContract.filters.NFTSold(tokenId);
      
      // Look back up to 5000 blocks or to genesis
      const fromBlock = Math.max(0, currentBlock - 5000);
      
      // Query events
      const mintEvents = await nftContract.queryFilter(mintFilter, fromBlock);
      const listEvents = await nftContract.queryFilter(listFilter, fromBlock);
      const saleEvents = await nftContract.queryFilter(saleFilter, fromBlock);
      
      // Process events into a unified format
      const events = [
        ...mintEvents.map(event => ({
          type: 'Minted',
          tokenId: event.args.tokenId.toString(),
          to: event.args.owner,
          from: null,
          price: null,
          timestamp: null, // Will be populated later
          txHash: event.transactionHash,
          blockNumber: event.blockNumber
        })),
        ...listEvents.map(event => ({
          type: 'Listed',
          tokenId: event.args.tokenId.toString(),
          from: event.args.seller,
          to: null,
          price: ethers.utils.formatEther(event.args.price),
          timestamp: null,
          txHash: event.transactionHash,
          blockNumber: event.blockNumber
        })),
        ...saleEvents.map(event => ({
          type: 'Sold',
          tokenId: event.args.tokenId.toString(),
          from: event.args.seller,
          to: event.args.buyer,
          price: ethers.utils.formatEther(event.args.price),
          timestamp: null,
          txHash: event.transactionHash,
          blockNumber: event.blockNumber
        }))
      ];
      
      // Sort events by block number (chronological order)
      events.sort((a, b) => a.blockNumber - b.blockNumber);
      
      // Get timestamps for each event
      const eventsWithTime = await Promise.all(
        events.map(async (event) => {
          const block = await provider.getBlock(event.blockNumber);
          return {
            ...event,
            timestamp: new Date(block.timestamp * 1000)
          };
        })
      );
      
      setTransactionHistory(eventsWithTime);
    } catch (err) {
      console.error("Error fetching NFT history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Add to cart handler
  const handleAddToCart = (e, nft) => {
    e.stopPropagation(); // Prevent opening the modal
    
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    const added = addToCart(nft);
    if (added) {
      setAddedToCart(nft.id);
      setTimeout(() => {
        setAddedToCart(null);
      }, 2000);
      // Show success notification
      alert(`${nft.name} added to cart!`);
    } else {
      // Show already in cart notification
      alert(`${nft.name} is already in your cart!`);
    }
  };
  
  // Relist NFT functionality
  const handleRelistNFT = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      await connectWallet();
      return;
    }
    
    if (!relistingPrice || parseFloat(relistingPrice) <= 0) {
      setError("Please enter a valid price");
      return;
    }
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );
      
      // Convert price to Wei
      const priceInWei = ethers.utils.parseEther(relistingPrice);
      
      // List NFT
      const listTx = await nftContract.listNFT(selectedNft.id, priceInWei);
      
      // Wait for transaction to complete
      await listTx.wait();
      
      // Reset form
      setRelistingPrice("");
      setShowRelistingForm(false);
      
      // Show success message
      alert(`Successfully listed ${selectedNft.name} for ${relistingPrice} ETH`);
      
      // Refresh data after short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (err) {
      console.error("Error listing NFT:", err);
      setError("Failed to list NFT: " + err.message);
    }
  };

  return (
    <div className="art-gallery-container">
      <div className="gallery-hero">
        <div className="gallery-hero-content">
          <h1>NFT Gallery</h1>
          <p>Discover, collect, and sell extraordinary NFTs</p>
        </div>
      </div>
      
      <div className="gallery-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
            </svg>
          </button>
        </div>
        
        <div className="filter-sort">
          <div className="filter-dropdown">
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="filter-select"
            >
              <option value="all">All NFTs</option>
              <option value="listed">For Sale</option>
              {isConnected && <option value="owned">Owned by Me</option>}
            </select>
          </div>
          
          <div className="sort-dropdown">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recent">Recently Added</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading NFTs...</p>
        </div>
      ) : filteredNfts.length > 0 ? (
        <div className="nft-grid">
          {filteredNfts.map((nft) => (
            <div className="nft-card" key={nft.id}>
              <div className="nft-image-container" onClick={() => openNftModal(nft)}>
                <img 
                  src={nft.image} 
                  alt={nft.name} 
                  className="nft-image" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-image.png"; // Replace with your placeholder image
                  }}
                />
                {nft.isListed && (
                  <button 
                    className={`add-to-cart-btn ${addedToCart === nft.id ? 'added' : ''}`}
                    onClick={(e) => handleAddToCart(e, nft)}
                    disabled={addedToCart === nft.id}
                    aria-label="Add to cart"
                  >
                    {addedToCart === nft.id ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    )}
                  </button>
                )}
              </div>
              <div className="nft-info" onClick={() => openNftModal(nft)}>
                <h3 className="nft-name">{nft.name}</h3>
                <p className="nft-collection">{nft.collection}</p>
                <div className="nft-price-row">
                  <span className="price-label">Price</span>
                  <span className="nft-price">
                    {nft.price === "Not listed" ? "Not listed" : `${nft.price} ETH`}
                  </span>
                </div>
                <div className="nft-card-details">
                  <span className="nft-owner">
                    Owner: {nft.owner ? `${nft.owner.slice(0, 4)}...${nft.owner.slice(-4)}` : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-nfts-message">
          <h3>No NFTs found</h3>
          <p>
            {searchTerm 
              ? "Try adjusting your search or filters" 
              : filterBy === "owned" && isConnected 
                ? "You don't own any NFTs yet. Mint or buy one!" 
                : "There are no NFTs available right now. Be the first to mint one!"}
          </p>
        </div>
      )}
      
      {/* NFT Detail Modal */}
      {isModalOpen && selectedNft && (
        <div className="modal-overlay" onClick={closeNftModal}>
          <div className="nft-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeNftModal}>×</button>
            
            <div className="modal-content">
              <div className="modal-image-section">
                <img 
                  src={selectedNft.image} 
                  alt={selectedNft.name} 
                  className="modal-nft-image"
                />
              </div>
              
              <div className="modal-details-section">
                <div className="modal-header">
                  <h2>{selectedNft.name}</h2>
                  <p className="nft-collection">{selectedNft.collection}</p>
                </div>
                
                <div className="nft-description">
                  <h3>Description</h3>
                  <p>{selectedNft.description}</p>
                </div>
                
                {selectedNft.attributes && selectedNft.attributes.length > 0 && (
                  <div className="nft-attributes">
                    <h3>Properties</h3>
                    <div className="attributes-grid">
                      {selectedNft.attributes.map((attr, index) => (
                        <div className="attribute-pill" key={index}>
                          <span className="attribute-type">{attr.trait_type}</span>
                          <span className="attribute-value">{attr.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="nft-details">
                  <div className="detail-row">
                    <span className="detail-label">Token ID</span>
                    <span className="detail-value">{selectedNft.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Owner</span>
                    <span className="detail-value address">
                      {selectedNft.owner ? `${selectedNft.owner.slice(0, 6)}...${selectedNft.owner.slice(-4)}` : 'Unknown'}
                    </span>
                  </div>
                </div>
                
                <div className="nft-price-container">
                  <div className="price-details">
                    <span className="price-label">Current Price</span>
                    <span className="modal-price">
                      {selectedNft.price === "Not listed" ? "Not listed" : `${selectedNft.price} ETH`}
                    </span>
                  </div>
                  
                  <div className="action-buttons">
                    {/* Buy button - only show if NFT is listed and not owned by current user */}
                    {selectedNft.isListed && 
                     selectedNft.owner && 
                     walletAddress && 
                     selectedNft.owner.toLowerCase() !== walletAddress.toLowerCase() && (
                      <button 
                        className="buy-button"
                        onClick={() => handleBuyNFT(selectedNft)}
                        disabled={!isConnected}
                      >
                        {!isConnected 
                          ? "Connect Wallet to Buy" 
                          : `Buy for ${selectedNft.price} ETH`}
                      </button>
                    )}
                    
                    {/* Add to cart button - only show if NFT is listed and not owned by current user */}
                    {selectedNft.isListed && 
                     selectedNft.owner && 
                     walletAddress && 
                     selectedNft.owner.toLowerCase() !== walletAddress.toLowerCase() && (
                      <button 
                        className="add-to-cart-button"
                        onClick={(e) => handleAddToCart(e, selectedNft)}
                      >
                        Add to Cart
                      </button>
                    )}
                    
                    {/* Relist button - only show if user owns the NFT and it's not listed */}
                    {isConnected && 
                     selectedNft.owner && 
                     walletAddress && 
                     selectedNft.owner.toLowerCase() === walletAddress.toLowerCase() && 
                     !selectedNft.isListed && 
                     !showRelistingForm && (
                      <button 
                        className="relist-button"
                        onClick={() => setShowRelistingForm(true)}
                      >
                        List for Sale
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Relisting form */}
                {showRelistingForm && (
                  <div className="relisting-form">
                    <h3>List Your NFT for Sale</h3>
                    <form onSubmit={handleRelistNFT}>
                      <div className="form-group">
                        <label htmlFor="price">Price (ETH)</label>
                        <input
                          id="price"
                          type="number"
                          step="0.001"
                          min="0.001"
                          value={relistingPrice}
                          onChange={(e) => setRelistingPrice(e.target.value)}
                          placeholder="Enter price in ETH"
                          required
                        />
                      </div>
                      
                      <div className="form-actions">
                        <button 
                          type="button" 
                          className="cancel-button"
                          onClick={() => setShowRelistingForm(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="confirm-button"
                        >
                          List for Sale
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {selectedNft.tags && selectedNft.tags.length > 0 && (
                  <div className="nft-tags">
                    {selectedNft.tags.map((tag, index) => (
                      <span className="tag" key={index}>{tag}</span>
                    ))}
                  </div>
                )}
                
                {/* Provenance History Section */}
                <div className="provenance-section">
                  <h3>Provenance History</h3>
                  
                  {loadingHistory ? (
                    <div className="history-loading">
                      <div className="loading-spinner-small"></div>
                      <p>Loading transaction history...</p>
                    </div>
                  ) : transactionHistory.length > 0 ? (
                    <div className="history-timeline">
                      {transactionHistory.map((event, index) => (
                        <div key={index} className={`history-item ${event.type.toLowerCase()}`}>
                          <div className="history-icon">
                            {event.type === 'Minted' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0z"/>
                              </svg>
                            )}
                            {event.type === 'Listed' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 8H4v8h16v-8zm0-2V5H4v4h16z"/>
                              </svg>
                            )}
                            {event.type === 'Sold' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M2 20h20v2H2v-2zm2-8h2v7H4v-7zm5 0h2v7H9v-7zm4 0h2v7h-2v-7zm5 0h2v7h-2v-7zM2 7l10-5 10 5v4H2V7zm2 1.236V9h16v-.764l-8-4-8 4z"/>
                              </svg>
                            )}
                          </div>
                          <div className="history-content">
                            <div className="history-title">
                              <span className="event-type">{event.type}</span>
                              {event.timestamp && (
                                <span className="event-date">
                                  {event.timestamp.toLocaleDateString()} {event.timestamp.toLocaleTimeString()}
                                </span>
                              )}
                            </div>
                            <div className="history-details">
                              {event.type === 'Minted' && (
                                <p>Created by <span className="address-text">
                                  {event.to ? `${event.to.slice(0, 6)}...${event.to.slice(-4)}` : 'Unknown'}
                                </span></p>
                              )}
                              {event.type === 'Listed' && (
                                <p>Listed for <span className="price-text">{event.price} ETH</span> by <span className="address-text">
                                  {event.from ? `${event.from.slice(0, 6)}...${event.from.slice(-4)}` : 'Unknown'}
                                </span></p>
                              )}
                              {event.type === 'Sold' && (
                                <p>Purchased for <span className="price-text">{event.price} ETH</span> by <span className="address-text">
                                  {event.to ? `${event.to.slice(0, 6)}...${event.to.slice(-4)}` : 'Unknown'}
                                </span> from <span className="address-text">
                                  {event.from ? `${event.from.slice(0, 6)}...${event.from.slice(-4)}` : 'Unknown'}
                                </span></p>
                              )}
                            </div>
                            <a 
                              href={`${NETWORK_CONFIG.blockExplorerUrls[0]}/tx/${event.txHash}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="transaction-link"
                            >
                              View Transaction
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                                <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-history">
                      <p>No transaction history available for this NFT</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtGallery;