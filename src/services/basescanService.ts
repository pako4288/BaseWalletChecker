import { API_CONFIG } from './config';
import type { Transaction } from '../types/transaction';

interface BaseScanTx {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  blockNumber: string;
  isError: string;
}

async function basescanFetch<T>(params: Record<string, string>): Promise<T> {
  const search = new URLSearchParams({ ...params, apikey: API_CONFIG.apiKey });
  const response = await fetch(`${API_CONFIG.basescanBaseUrl}?${search.toString()}`);

  if (!response.ok) {
    throw new Error(`BaseScan API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.status === '0' && data.message !== 'No transactions found') {
    throw new Error(data.result ?? data.message ?? 'BaseScan API error');
  }

  return data.result as T;
}

export async function fetchWalletTransactions(address: string): Promise<Transaction[]> {
  const raw = await basescanFetch<BaseScanTx[]>({
    module: 'account',
    action: 'txlist',
    address,
    startblock: '0',
    endblock: '99999999',
    page: '1',
    offset: '10000',
    sort: 'desc',
  });

  if (!Array.isArray(raw)) return [];

  return raw.map((tx) => ({
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: (Number(tx.value) / 1e18).toFixed(6),
    timestamp: Number(tx.timeStamp) * 1000,
    blockNumber: Number(tx.blockNumber),
    status: tx.isError === '0' ? 'success' : 'failed',
  }));
}

export async function fetchNetworkStats(): Promise<{ lastBlock: number; gasPriceGwei: number }> {
  const [blockHex, gasHex] = await Promise.all([
    basescanFetch<string>({ module: 'proxy', action: 'eth_blockNumber' }),
    basescanFetch<string>({ module: 'proxy', action: 'eth_gasPrice' }),
  ]);

  return {
    lastBlock: parseInt(blockHex, 16),
    gasPriceGwei: parseInt(gasHex, 16) / 1e9,
  };
}
