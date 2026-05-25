import { API_CONFIG } from './config';
import { MOCK_NETWORK_STATS } from './mockData';
import { fetchNetworkStats } from './basescanService';
import type { NetworkStats } from '../types/network';

export async function getNetworkStats(): Promise<NetworkStats> {
  if (API_CONFIG.useMockData || !API_CONFIG.apiKey) {
    await new Promise((r) => setTimeout(r, 400));
    return { ...MOCK_NETWORK_STATS };
  }

  const { lastBlock, gasPriceGwei } = await fetchNetworkStats();

  return {
    lastBlock,
    totalTransactions: MOCK_NETWORK_STATS.totalTransactions,
    gasPriceGwei,
    dailyTransactions: MOCK_NETWORK_STATS.dailyTransactions,
  };
}
