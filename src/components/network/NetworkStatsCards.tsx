import { useEffect, useState } from 'react';
import { getNetworkStats } from '../../services/networkService';
import type { NetworkStats } from '../../types/network';
import { GlassCard } from '../ui/GlassCard';
import { LoadingState } from '../ui/LoadingState';
import { ErrorState } from '../ui/ErrorState';
import './NetworkStatsCards.css';

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function NetworkStatsCards() {
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getNetworkStats()
      .then((data) => {
        if (!cancelled) {
          setStats(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <LoadingState message="Loading Base network stats..." />;
  }

  if (error || !stats) {
    return (
      <ErrorState
        message="Could not load network statistics"
        onRetry={() => window.location.reload()}
      />
    );
  }

  const cards = [
    { label: 'Latest block', value: formatNumber(stats.lastBlock) },
    { label: 'Total transactions', value: formatNumber(stats.totalTransactions) },
    { label: 'Gas price', value: `${stats.gasPriceGwei} Gwei` },
    {
      label: 'Daily TX',
      value: stats.dailyTransactions !== null ? formatNumber(stats.dailyTransactions) : 'N/A',
    },
  ];

  return (
    <section className="network-stats">
      <h2 className="section-title">Base network</h2>
      <div className="network-stats__grid">
        {cards.map((card) => (
          <GlassCard key={card.label} className="network-stats__card">
            <div className="network-stats__value">{card.value}</div>
            <div className="network-stats__label">{card.label}</div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
