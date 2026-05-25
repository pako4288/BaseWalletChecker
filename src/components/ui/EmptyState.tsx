import './State.css';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = 'Enter a wallet address and click Check',
}: EmptyStateProps) {
  return (
    <div className="state state--empty">
      <span className="state__icon" aria-hidden="true">
        ?
      </span>
      <p className="state__message">{message}</p>
    </div>
  );
}
