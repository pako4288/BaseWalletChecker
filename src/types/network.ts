export interface NetworkStats {
  lastBlock: number;
  totalTransactions: number;
  gasPriceGwei: number;
  dailyTransactions: number | null;
}
