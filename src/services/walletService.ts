import { API_CONFIG } from './config';
import { getMockWalletTransactions } from './mockData';
import { fetchWalletTransactions } from './basescanService';
import { calculatePeriodCounts, getFirstAndLastTimestamps } from '../utils/calculateStats';
import { formatDateShort } from '../utils/formatDate';
import type { WalletActivity } from '../types/wallet';

const RECENT_LIMIT = 10;

export async function getWalletActivity(address: string): Promise<WalletActivity> {
  const transactions =
    API_CONFIG.useMockData || !API_CONFIG.apiKey
      ? getMockWalletTransactions(address)
      : await fetchWalletTransactions(address);

  const periodCounts = calculatePeriodCounts(transactions);
  const { first, last } = getFirstAndLastTimestamps(transactions);

  return {
    address,
    totalTransactions: transactions.length,
    periodCounts,
    firstTransactionDate: first ? formatDateShort(first) : null,
    lastTransactionDate: last ? formatDateShort(last) : null,
    recentTransactions: transactions.slice(0, RECENT_LIMIT),
  };
}
