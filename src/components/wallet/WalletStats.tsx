import type { WalletActivity } from '../../types/wallet';
import { GlassCard } from '../ui/GlassCard';
import './WalletStats.css';

interface WalletStatsProps {
  activity: WalletActivity;
}

const PERIOD_LABELS: { key: keyof WalletActivity['periodCounts']; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: '7 days' },
  { key: 'month', label: '30 days' },
  { key: 'year', label: 'Year' },
  { key: 'allTime', label: 'All time' },
];

export function WalletStats({ activity }: WalletStatsProps) {
  return (
    <GlassCard className="wallet-stats">
      <h2 className="section-title">Wallet statistics</h2>
      <p className="wallet-stats__address" title={activity.address}>
        {activity.address}
      </p>

      <div className="wallet-stats__total">
        <span className="wallet-stats__total-value">{activity.totalTransactions}</span>
        <span className="wallet-stats__total-label">total transactions</span>
      </div>

      <div className="stat-grid">
        {PERIOD_LABELS.map(({ key, label }) => (
          <div key={key} className="stat-item">
            <div className="stat-item__value">{activity.periodCounts[key]}</div>
            <div className="stat-item__label">{label}</div>
          </div>
        ))}
      </div>

      <div className="wallet-stats__dates">
        <div className="wallet-stats__date-row">
          <span className="wallet-stats__date-label">First transaction</span>
          <span>{activity.firstTransactionDate ?? '—'}</span>
        </div>
        <div className="wallet-stats__date-row">
          <span className="wallet-stats__date-label">Last transaction</span>
          <span>{activity.lastTransactionDate ?? '—'}</span>
        </div>
      </div>
    </GlassCard>
  );
}
