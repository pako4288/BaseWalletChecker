import type { Transaction } from '../../types/transaction';
import { formatDate } from '../../utils/formatDate';
import { GlassCard } from '../ui/GlassCard';
import './TransactionTable.css';

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <GlassCard>
        <h2 className="section-title">Recent transactions</h2>
        <p className="tx-table__empty">No transactions found</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="tx-table">
      <h2 className="section-title">Last 10 transactions</h2>
      <div className="tx-table__wrapper">
        <table className="tx-table__table">
          <thead>
            <tr>
              <th>Hash</th>
              <th>From</th>
              <th>To</th>
              <th>ETH</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash}>
                <td className="tx-table__hash" title={tx.hash}>
                  {shortenHash(tx.hash)}
                </td>
                <td className="tx-table__addr" title={tx.from}>
                  {shortenHash(tx.from)}
                </td>
                <td className="tx-table__addr" title={tx.to}>
                  {shortenHash(tx.to)}
                </td>
                <td>{tx.value}</td>
                <td className="tx-table__date">{formatDate(tx.timestamp)}</td>
                <td>
                  <span className={`tx-table__status tx-table__status--${tx.status}`}>
                    {tx.status === 'success' ? 'OK' : 'Fail'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

function shortenHash(value: string): string {
  if (value.length <= 14) return value;
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}
