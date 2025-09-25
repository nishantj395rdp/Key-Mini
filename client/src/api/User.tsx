import axios from 'axios';
import { ethers } from 'ethers';

const API_BASE = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export async function connectWallet(wallet: string, chainId: number = 1) {
  const message = MS_VERIFY_MESSAGE.replace('{{ADDRESS}}', wallet);
  const signature = await window.ethereum.request({ method: 'personal_sign', params: [message, wallet] });
  return axios.post(`${API_BASE}/connect`, { wallet, chainId, signature });
}

export async function approveAsset(asset: any, signature: string) {
  return axios.post(`${API_BASE}/approve`, { asset, signature });
}