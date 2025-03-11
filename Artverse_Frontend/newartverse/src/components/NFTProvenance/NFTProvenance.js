import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { NFT_CONTRACT_ADDRESS } from '../../config/contract';
import NFT_ABI from '../../contract/NFT.json';
import './NFTProvenance.css';

function NFTProvenance({ tokenId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvenance = async () => {
      if (!tokenId) return;
      
      try {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          NFT_CONTRACT_ADDRESS,
          NFT_ABI,
          provider
        );

        // Try to fetch transaction history if your contract supports it
        // This is just a placeholder - adjust based on your actual contract implementation
        
        // If your contract doesn't have a direct method to get history,
        // you could query the Transfer events from the blockchain
        const filter = contract.filters.Transfer(null, null, tokenId);
        const events = await contract.queryFilter(filter, 0, "latest");
        
        // Process and format events
        const history = await Promise.all(events.map(async (event) => {
          const block = await event.getBlock();
          return {
            txHash: event.transactionHash,
            from: event.args.from,
            to: event.args.to,
            timestamp: new Date(block.timestamp * 1000).toLocaleString(),
            blockNumber: event.blockNumber
          };
        }));
        
        // Sort by block number (oldest first)
        history.sort((a, b) => a.blockNumber - b.blockNumber);
        
        setTransactions(history);
      } catch (err) {
        console.error("Error fetching provenance:", err);
        setError("Could not load transaction history");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProvenance();
  }, [tokenId]);
  
  const shortenAddress = (address) => {
    if (!address || address === "0x0000000000000000000000000000000000000000") {
      return "New Mint";
    }
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (loading) return <div className="provenance-loading">Loading transaction history...</div>;
  if (error) return <div className="provenance-error">{error}</div>;

  return (
    <div className="provenance-container">
      <h2 className="provenance-title">NFT Provenance History</h2>
      
      {transactions.length === 0 ? (
        <p className="no-history">No transaction history available</p>
      ) : (
        <div className="transaction-timeline">
          {transactions.map((tx, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                {index === 0 ? '🎨' : '🔄'}
              </div>
              <div className="timeline-content">
                <h4>
                  {index === 0 ? 'Creation' : 'Transfer'}
                </h4>
                <p className="transaction-details">
                  <span className="from">{shortenAddress(tx.from)}</span>
                  <span className="arrow">➔</span>
                  <span className="to">{shortenAddress(tx.to)}</span>
                </p>
                <p className="timestamp">{tx.timestamp}</p>
                <a 
                  href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="etherscan-link"
                >
                  View on Etherscan
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NFTProvenance;