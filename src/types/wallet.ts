import type { Transaction } from './transaction';

export interface PeriodCounts {
  today: number;
  week: number;
  month: number;
  year: number;
  allTime: number;
}

export interface WalletActivity {
  address: string;
  totalTransactions: number;
  periodCounts: PeriodCounts;
  firstTransactionDate: string | null;
  lastTransactionDate: string | null;
  recentTransactions: Transaction[];
}
