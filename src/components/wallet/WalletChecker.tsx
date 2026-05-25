import { useState, type FormEvent } from 'react';
import { getAddressError, normalizeAddress } from '../../utils/validateAddress';
import { getWalletActivity } from '../../services/walletService';
import type { WalletActivity } from '../../types/wallet';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { WalletStats } from './WalletStats';
import { TransactionTable } from './TransactionTable';
import { LoadingState } from '../ui/LoadingState';
import { ErrorState } from '../ui/ErrorState';
import { EmptyState } from '../ui/EmptyState';
import './WalletChecker.css';

type CheckState = 'idle' | 'loading' | 'success' | 'error';

export function WalletChecker() {
  const [input, setInput] = useState('');
  const [checkState, setCheckState] = useState<CheckState>('idle');
  const [activity, setActivity] = useState<WalletActivity | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleCheck(e?: FormEvent) {
    e?.preventDefault();

    const validationError = getAddressError(input);
    if (validationError) {
      setCheckState('error');
      setErrorMessage(validationError);
      setActivity(null);
      return;
    }

    const address = normalizeAddress(input);
    setCheckState('loading');
    setErrorMessage('');
    setActivity(null);

    try {
      const result = await getWalletActivity(address);
      setActivity(result);
      setCheckState('success');
    } catch {
      setCheckState('error');
      setErrorMessage('Could not load wallet data. Check the address or try again later.');
    }
  }

  return (
    <section className="wallet-checker">
      <GlassCard>
        <h2 className="section-title">Check wallet</h2>
        <form className="wallet-checker__form" onSubmit={handleCheck}>
          <input
            type="text"
            className="wallet-checker__input"
            placeholder="0x..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Base wallet address"
          />
          <Button type="submit" loading={checkState === 'loading'}>
            Check
          </Button>
        </form>
      </GlassCard>

      <div className="wallet-checker__results">
        {checkState === 'idle' && <EmptyState />}
        {checkState === 'loading' && <LoadingState message="Analyzing transactions..." />}
        {checkState === 'error' && (
          <ErrorState message={errorMessage} onRetry={() => handleCheck()} />
        )}
        {checkState === 'success' && activity && (
          <>
            <WalletStats activity={activity} />
            <TransactionTable transactions={activity.recentTransactions} />
          </>
        )}
      </div>
    </section>
  );
}
