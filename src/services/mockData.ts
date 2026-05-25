import type { Transaction } from '../types/transaction';
import type { NetworkStats } from '../types/network';

const DAY = 24 * 60 * 60 * 1000;

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function generateMockTransactions(address: string): Transaction[] {
  const rand = seededRandom(address);
  const count = 25 + Math.floor(rand() * 40);
  const now = Date.now();
  const txs: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(rand() * 400);
    const hoursAgo = Math.floor(rand() * 24);
    const timestamp = now - daysAgo * DAY - hoursAgo * 60 * 60 * 1000;

    txs.push({
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(rand() * 16).toString(16)).join('')}`,
      from: i % 3 === 0 ? address : `0x${'a'.repeat(40)}`,
      to: i % 3 !== 0 ? address : `0x${'b'.repeat(40)}`,
      value: (rand() * 2).toFixed(4),
      timestamp,
      blockNumber: 18_000_000 + count - i,
      status: rand() > 0.05 ? 'success' : 'failed',
    });
  }

  return txs.sort((a, b) => b.timestamp - a.timestamp);
}

export function getMockWalletTransactions(address: string): Transaction[] {
  return generateMockTransactions(address.toLowerCase());
}

export const MOCK_NETWORK_STATS: NetworkStats = {
  lastBlock: 18_432_891,
  totalTransactions: 892_451_203,
  gasPriceGwei: 0.012,
  dailyTransactions: 4_821_390,
};
