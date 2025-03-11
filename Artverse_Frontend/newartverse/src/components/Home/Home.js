import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../../config/contract";
import "./Home.css";
import nft2Image from './nft2.jpg';


function Home() {
  const [featuredNfts, setFeaturedNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedNfts = async () => {
      try {
        if (!window.ethereum) return;
        
        setLoading(true);
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const nftContract = new ethers.Contract(
          NFT_CONTRACT_ADDRESS,
          NFT_CONTRACT_ABI,
          provider
        );
        
        // Get all unsold NFTs 
        const unsoldNFTs = await nftContract.getUnsoldNFTs();
        
        // Process only the first 4 NFTs for featured section
        const featuredLimit = Math.min(4, unsoldNFTs.length);
        const featuredNftPromises = [];
        
        for (let i = 0; i < featuredLimit; i++) {
          const nft = unsoldNFTs[i];
          try {
            // Get token URI from contract
            const tokenURI = await nftContract.tokenURI(nft.tokenId.toString());
            
            // Convert IPFS URI to HTTP gateway URL
            const ipfsURL = tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
            
            // Fetch metadata
            const response = await fetch(ipfsURL);
            const metadata = await response.json();
            
            // Convert image IPFS URL to HTTP
            const imageURL = metadata.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
            
            featuredNftPromises.push({
              id: nft.tokenId.toString(),
              name: metadata.name || `NFT #${nft.tokenId.toString()}`,
              description: metadata.description || "No description available",
              image: imageURL,
              price: ethers.utils.formatEther(nft.price || "0"),
              seller: nft.seller
            });
          } catch (err) {
            console.error(`Error fetching featured NFT:`, err);
          }
        }
        
        const results = await Promise.all(featuredNftPromises);
        setFeaturedNfts(results.filter(nft => nft !== null));
      } catch (err) {
        console.error("Error fetching featured NFTs:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedNfts();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover, Collect & Sell Extraordinary NFTs</h1>
          <p>Artverse is the world's first and largest NFT marketplace</p>
          
          <div className="hero-buttons">
            <Link to="/gallery" className="hero-button explore">
              Explore Collection
            </Link>
            <Link to="/mint" className="hero-button create">
              Create NFT
            </Link>
          </div>
        </div>
        
        <div className="hero-image">
        <img src={nft2Image} alt="Featured NFT artwork" />
        </div>
      </div>
      
      <div className="featured-section">
        <h2>Featured Artworks</h2>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading featured NFTs...</p>
          </div>
        ) : featuredNfts.length > 0 ? (
          <div className="featured-grid">
            {featuredNfts.map(nft => (
              <Link to={`/gallery?nft=${nft.id}`} className="featured-card" key={nft.id}>
                <div className="featured-image">
                  <img src={nft.image} alt={nft.name} />
                </div>
                <div className="featured-info">
                  <h3>{nft.name}</h3>
                  <div className="featured-price">
                    <span>{nft.price} ETH</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="featured-placeholder">
            <p>No featured NFTs available right now</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;