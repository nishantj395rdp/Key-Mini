import { create } from 'zustand';
import { connectWallet } from '../api/User';

export const useWalletStore = create((set) => ({
  connected: false,
  address: '',
  connect: async (addr: string, chain: number) => {
    await connectWallet(addr, chain);
    set({ connected: true, address: addr });
  },
}));