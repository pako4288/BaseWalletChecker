import type { Transaction } from '../types/transaction';
import type { PeriodCounts } from '../types/wallet';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function startOfDay(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Count transactions for today, week, month, year, and all time. */
export function calculatePeriodCounts(
  transactions: Transaction[],
  referenceDate: Date = new Date(),
): PeriodCounts {
  const now = referenceDate.getTime();
  const todayStart = startOfDay(referenceDate);
  const weekStart = now - 7 * MS_PER_DAY;
  const monthStart = now - 30 * MS_PER_DAY;
  const yearStart = now - 365 * MS_PER_DAY;

  let today = 0;
  let week = 0;
  let month = 0;
  let year = 0;

  for (const tx of transactions) {
    const ts = tx.timestamp;
    if (ts >= todayStart) today++;
    if (ts >= weekStart) week++;
    if (ts >= monthStart) month++;
    if (ts >= yearStart) year++;
  }

  return { today, week, month, year, allTime: transactions.length };
}

export function getFirstAndLastTimestamps(transactions: Transaction[]): {
  first: number | null;
  last: number | null;
} {
  if (transactions.length === 0) return { first: null, last: null };

  let first = transactions[0].timestamp;
  let last = transactions[0].timestamp;

  for (const tx of transactions) {
    if (tx.timestamp < first) first = tx.timestamp;
    if (tx.timestamp > last) last = tx.timestamp;
  }

  return { first, last };
}
