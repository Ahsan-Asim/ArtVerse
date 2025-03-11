import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "../../context/WalletContext";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../../config/contract";
import RelistNFT from "../RelistNFT/RelistNFT";
import "./MyNFTs.css";

function MyNFTs() {
  const { isConnected, walletAddress, connectWallet } = useWallet();
  const [myNfts, setMyNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNft, setSelectedNft] = useState(null);
  const [showRelistModal, setShowRelistModal] = useState(false);

  // Fix the missing dependency warning
  const fetchMyNftsCallback = React.useCallback(async () => {
    if (!isConnected || !walletAddress) return;
    
    setLoading(true);
    setError("");

    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to view your NFTs");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        provider
      );

      // Get current block number for reference
      const currentBlock = await provider.getBlockNumber();
      
      // Look back up to 10000 blocks or to genesis
      const fromBlock = Math.max(0, currentBlock - 10000);
      
      // Query all Transfer events where the destination is the current wallet
      const transferFilter = nftContract.filters.Transfer(null, walletAddress);
      const receivedEvents = await nftContract.queryFilter(transferFilter, fromBlock);
      
      // Query all Transfer events where the source is the current wallet
      const sentFilter = nftContract.filters.Transfer(walletAddress, null);
      const sentEvents = await nftContract.queryFilter(sentFilter, fromBlock);
      
      // Process events to determine currently owned tokens
      const ownedTokens = new Map(); // Using Map for O(1) access
      
      // Add tokens received
      for (const event of receivedEvents) {
        ownedTokens.set(event.args.tokenId.toString(), true);
      }
      
      // Remove tokens sent
      for (const event of sentEvents) {
        ownedTokens.delete(event.args.tokenId.toString());
      }
      
      // Convert to array of token IDs
      const ownedTokenIds = [...ownedTokens.keys()];
      
      if (ownedTokenIds.length === 0) {
        setMyNfts([]);
        return;
      }
      
      // Fetch details for each owned token
      const nftsData = await Promise.all(
        ownedTokenIds.map(async (tokenId) => {
          // Create basic NFT data
          let nftData = {
            owner: walletAddress,
            isListed: false,
            price: ethers.BigNumber.from("0")
          };
          
          // Try to get marketplace data if available
          try {
            const marketData = await nftContract.getNFT(tokenId);
            nftData = marketData;
          } catch (err) {
            console.log(`No market data for token ${tokenId}`);
          }
          
          // Get token URI
          let tokenURI;
          try {
            tokenURI = await nftContract.tokenURI(tokenId);
          } catch (err) {
            console.error(`Error getting tokenURI for ${tokenId}:`, err);
            tokenURI = "";
          }
          
          // Process metadata
          let metadata = {};
          try {
            if (tokenURI.startsWith("ipfs://")) {
              const ipfsHash = tokenURI.replace("ipfs://", "");
              const response = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
              metadata = await response.json();
            } else if (tokenURI.startsWith("http")) {
              const response = await fetch(tokenURI);
              metadata = await response.json();
            } else {
              metadata = {
                name: `NFT #${tokenId}`,
                description: "NFT description",
                image: "/placeholder-image.png"
              };
            }
          } catch (err) {
            console.error("Error fetching metadata:", err);
            metadata = {
              name: `NFT #${tokenId}`,
              description: "Metadata unavailable",
              image: "/placeholder-image.png"
            };
          }
          
          // Process image URL
          let imageUrl = metadata.image || "/placeholder-image.png";
          if (imageUrl && imageUrl.startsWith("ipfs://")) {
            const ipfsHash = imageUrl.replace("ipfs://", "");
            imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
          }
          
          return {
            id: tokenId.toString(),
            name: metadata.name || `NFT #${tokenId}`,
            description: metadata.description || "No description available",
            image: imageUrl,
            attributes: metadata.attributes || [],
            owner: walletAddress,
            creator: nftData.creator || nftData.seller || walletAddress,
            price: nftData.isListed 
              ? ethers.utils.formatEther(nftData.price.toString()) 
              : "Not listed",
            isListed: nftData.isListed
          };
        })
      );
      
      setMyNfts(nftsData);
      
    } catch (err) {
      console.error("Error fetching owned NFTs:", err);
      setError(`Failed to load your NFTs: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [isConnected, walletAddress]);

  useEffect(() => {
    if (isConnected) {
      fetchMyNftsCallback();
    } else {
      setMyNfts([]);
      setLoading(false);
    }
  }, [isConnected, fetchMyNftsCallback]);

  const handleOpenRelistModal = (nft) => {
    setSelectedNft(nft);
    setShowRelistModal(true);
  };

  const handleCloseRelistModal = () => {
    setSelectedNft(null);
    setShowRelistModal(false);
  };

  const handleRelistSuccess = () => {
    // Refresh NFTs after successful relisting
    fetchMyNftsCallback();
    handleCloseRelistModal();
  };

  if (!isConnected) {
    return (
      <div className="my-nfts-container not-connected">
        <h1>My NFTs</h1>
        <div className="not-connected-message">
          <p>Please connect your wallet to view your NFTs.</p>
          <button className="connect-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-nfts-container">
      <div className="my-nfts-header">
        <h1>My NFTs</h1>
        <button className="refresh-button" onClick={fetchMyNftsCallback} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your NFTs...</p>
        </div>
      ) : myNfts.length > 0 ? (
        <div className="nft-grid">
          {myNfts.map((nft) => (
            <div className="nft-card" key={nft.id}>
              <div className="nft-image-container">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="nft-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-image.png";
                  }}
                />
              </div>
              <div className="nft-info">
                <h3 className="nft-name">{nft.name}</h3>
                <div className="nft-price-row">
                  <span className="price-label">Status</span>
                  <span className={`nft-status ${nft.isListed ? "listed" : "not-listed"}`}>
                    {nft.isListed ? `Listed: ${nft.price} ETH` : "Not Listed"}
                  </span>
                </div>
                <div className="nft-actions">
                  {!nft.isListed && (
                    <button
                      className="relist-button"
                      onClick={() => handleOpenRelistModal(nft)}
                    >
                      List for Sale
                    </button>
                  )}
                  {nft.isListed && (
                    <button
                      className="cancel-listing-button"
                      onClick={() => {/* Cancel listing function */}}
                    >
                      Cancel Listing
                    </button>
                  )}
                  <button
                    className="view-details-button"
                    onClick={() => {/* View details function */}}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-nfts-message">
          <h3>You don't own any NFTs yet</h3>
          <p>Purchase NFTs from the gallery or mint your own!</p>
          <div className="no-nfts-actions">
            <button className="primary-button" onClick={() => window.location.href = "/gallery"}>
              Browse Gallery
            </button>
            <button className="secondary-button" onClick={() => window.location.href = "/mint"}>
              Mint New NFT
            </button>
          </div>
        </div>
      )}

      {showRelistModal && selectedNft && (
        <RelistNFT
          nft={selectedNft}
          onClose={handleCloseRelistModal}
          onSuccess={handleRelistSuccess}
        />
      )}
    </div>
  );
}

export default MyNFTs;