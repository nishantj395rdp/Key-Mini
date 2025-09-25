import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const tabs = ['Mine', 'Tasks', 'Upgrade', 'Wallet'];

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Mine');

  return (
    <div className="h-screen bg-black text-white flex">
      <nav className="w-20 bg-gray-900 flex flex-col items-center py-4 space-y-6">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm ${activeTab === tab ? 'text-orange-500 border-l-2 border-orange-500' : 'text-gray-400'}`}>
            {tab[0]}
          </button>
        ))}
      </nav>
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet context={{ activeTab }} />
      </main>
    </div>
  );
};

export default AppLayout;