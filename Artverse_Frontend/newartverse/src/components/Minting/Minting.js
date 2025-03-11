import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useWallet } from "../../context/WalletContext";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, NETWORK_CONFIG } from "../../config/contract";
import "./Minting.css";

function Minting() {
  // Basic NFT details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState("");
  const [price, setPrice] = useState("");
  const [royalty, setRoyalty] = useState("10");
  const [tags, setTags] = useState("");

  // Properties/attributes (traits)
  const [properties, setProperties] = useState([
    { trait_type: "", value: "" }
  ]);

  // File handling
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Processing states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [listingFee, setListingFee] = useState("0.01");
  
  // Get wallet from context
  const { isConnected, walletAddress, connectWallet } = useWallet();

  // Fetch listing fee from contract on component mount
  useEffect(() => {
    const getListingFee = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const nftContract = new ethers.Contract(
            NFT_CONTRACT_ADDRESS, 
            NFT_CONTRACT_ABI, 
            provider
          );
          
          const fee = await nftContract.listingFee();
          setListingFee(ethers.utils.formatEther(fee));
        } catch (error) {
          console.error("Error fetching listing fee:", error);
        }
      }
    };
    
    getListingFee();
  }, []);

  // Handle file selection and generate preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    // Create preview URL
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  // Add a new property field
  const addProperty = () => {
    setProperties([...properties, { trait_type: "", value: "" }]);
  };

  // Update property value
  const updateProperty = (index, field, value) => {
    const updatedProperties = [...properties];
    updatedProperties[index][field] = value;
    setProperties(updatedProperties);
  };

  // Remove property field
  const removeProperty = (index) => {
    const updatedProperties = [...properties];
    updatedProperties.splice(index, 1);
    setProperties(updatedProperties);
  };

  // Check network and switch if needed
  const checkAndSwitchNetwork = async () => {
    if (!window.ethereum) return false;
    
    try {
      // Check current network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      // If not on Mumbai testnet, prompt to switch
      if (chainId !== NETWORK_CONFIG.chainId) {
        try {
          // Try to switch to Mumbai
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: NETWORK_CONFIG.chainId }],
          });
          return true;
        } catch (switchError) {
          // If network doesn't exist in wallet, add it
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [NETWORK_CONFIG],
              });
              return true;
            } catch (addError) {
              console.error("Error adding network:", addError);
              setError("Could not add network. Please add Mumbai network manually in your wallet.");
              return false;
            }
          }
          console.error("Error switching network:", switchError);
          setError("Could not switch network. Please switch to Mumbai testnet manually.");
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Error checking network:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check wallet connection
    if (!isConnected) {
      const connected = await connectWallet();
      if (!connected) {
        setError("Please connect your wallet to mint NFTs");
        return;
      }
    }
    
    // Check network and switch if needed
    const isCorrectNetwork = await checkAndSwitchNetwork();
    if (!isCorrectNetwork) {
      return;
    }
    
    // Validate inputs
    if (!file) {
      setError("Please upload an image for your NFT");
      return;
    }
    
    if (!name || !description) {
      setError("Please provide both name and description for your NFT");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      // Step 1: Upload image to IPFS via Pinata
      const formData = new FormData();
      formData.append("file", file);
      
      const imageUploadRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS", 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "34513f4784dc7b5f3d59",
            pinata_secret_api_key: "5b191a7c6a5ede729240b45d97e097e7e6f7fcc4b490a3c2bdbe1cd3f43c83d5",
          },
        }
      );
      
      console.log("Image upload successful:", imageUploadRes.data);
      
      // Step 2: Create and upload metadata
      const metadata = {
        name,
        description,
        collection,
        royalty: parseInt(royalty),
        tags: tags.split(",").map(tag => tag.trim()),
        attributes: properties.filter(p => p.trait_type && p.value),
        image: `ipfs://${imageUploadRes.data.IpfsHash}`
      };
      
      const metadataRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            pinata_api_key: "fed6822ccd5bc3a11ee8",
            pinata_secret_api_key: "0fc6b955a3cfcd897f6d09b07a54871e892197c167c0a2c28a252ea0dcb1ea48",
          },
        }
      );
      
      console.log("Metadata upload successful:", metadataRes.data);
      const tokenUri = `ipfs://${metadataRes.data.IpfsHash}`;
      
      // Step 3: Mint NFT using smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );
      
      // First mint the NFT
      const mintTx = await nftContract.mintNFT(tokenUri);
      const mintReceipt = await mintTx.wait();
      
      // Extract tokenId from event logs
      let tokenId;
      const nftMintedEvent = mintReceipt.events.find(
        (event) => event.event === "NFTMinted"
      );
      
      if (nftMintedEvent) {
        tokenId = nftMintedEvent.args.tokenId.toString();
      }
      
      // If price is set, list the NFT for sale
      if (price && parseFloat(price) > 0) {
        const priceInWei = ethers.utils.parseEther(price.toString());
        const listTx = await nftContract.listNFT(tokenId, priceInWei);
        await listTx.wait();
        
        setSuccess(`NFT minted and listed for sale! Token ID: ${tokenId}\nView on IPFS: https://gateway.pinata.cloud/ipfs/${metadataRes.data.IpfsHash}`);
      } else {
        setSuccess(`NFT minted successfully! Token ID: ${tokenId}\nView on IPFS: https://gateway.pinata.cloud/ipfs/${metadataRes.data.IpfsHash}`);
      }
      
      // Reset form
      setName("");
      setDescription("");
      setCollection("");
      setPrice("");
      setRoyalty("10");
      setTags("");
      setProperties([{ trait_type: "", value: "" }]);
      setFile(null);
      setPreviewUrl(null);
      
    } catch (error) {
      console.error("Error minting NFT:", error);
      setError(error.message || "Failed to mint NFT. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="minting-page">
      <div className="minting-container">
        <div className="minting-header">
          <h1>Create Your NFT</h1>
          <p>Fill in the details to mint your unique digital asset</p>
          
          {/* Wallet status */}
          <div className="wallet-status">
            {isConnected ? (
              <div className="connected-wallet">
                <span className="status-indicator connected"></span>
                Wallet Connected: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
              </div>
            ) : (
              <div className="disconnected-wallet">
                <span className="status-indicator"></span>
                Wallet Not Connected
                <button className="connect-wallet-btn" onClick={connectWallet}>Connect</button>
              </div>
            )}
          </div>
        </div>
        
        {/* Display messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="minting-content">
          <div className="nft-preview-section">
            <h2>NFT Preview</h2>
            <div className="preview-container">
              {previewUrl ? (
                <div className="nft-preview">
                  <img src={previewUrl} alt="NFT Preview" />
                  <div className="preview-details">
                    <h3>{name || "Untitled NFT"}</h3>
                    <p className="preview-creator">By You</p>
                  </div>
                </div>
              ) : (
                <div className="preview-placeholder">
                  <div className="placeholder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <p>Upload an image to preview your NFT</p>
                </div>
              )}
            </div>
            
            <div className="file-uploader">
              <label htmlFor="file-upload" className="upload-button">
                {file ? "Change Image" : "Upload Image"}
              </label>
              <input 
                id="file-upload" 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*"
                className="hidden-input"
                required
              />
              {file && (
                <span className="file-name">{file.name}</span>
              )}
            </div>
          </div>
          
          <div className="nft-form-section">
            <form onSubmit={handleSubmit} className="minting-form">
              <div className="form-group">
                <label>NFT Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Give your NFT a name"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Tell the story behind your creation"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Collection</label>
                <input 
                  type="text" 
                  value={collection} 
                  onChange={(e) => setCollection(e.target.value)} 
                  placeholder="The collection this NFT belongs to"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label>Price (ETH)</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    placeholder="0.05"
                    step="0.001"
                    min="0"
                  />
                </div>
                
                <div className="form-group half">
                  <label>Royalty %</label>
                  <input 
                    type="number" 
                    value={royalty} 
                    onChange={(e) => setRoyalty(e.target.value)} 
                    placeholder="10"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={tags} 
                  onChange={(e) => setTags(e.target.value)} 
                  placeholder="digital art, abstract, portrait"
                />
              </div>
              
              <div className="properties-section">
                <div className="properties-header">
                  <label>Properties</label>
                  <button type="button" className="add-property-btn" onClick={addProperty}>
                    + Add Property
                  </button>
                </div>
                
                {properties.map((prop, index) => (
                  <div className="property-row" key={index}>
                    <div className="form-group property-input">
                      <input 
                        type="text" 
                        value={prop.trait_type} 
                        onChange={(e) => updateProperty(index, 'trait_type', e.target.value)} 
                        placeholder="Trait (e.g. Color)"
                      />
                    </div>
                    
                    <div className="form-group property-input">
                      <input 
                        type="text" 
                        value={prop.value} 
                        onChange={(e) => updateProperty(index, 'value', e.target.value)} 
                        placeholder="Value (e.g. Blue)"
                      />
                    </div>
                    
                    <button 
                      type="button" 
                      className="remove-property-btn"
                      onClick={() => removeProperty(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <button 
                type="submit" 
                className="mint-submit-btn"
                disabled={isLoading || !isConnected}
              >
                {isLoading ? "Creating NFT..." : "Create NFT"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Minting;