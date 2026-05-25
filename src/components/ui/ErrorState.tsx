import './State.css';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state state--error" role="alert">
      <span className="state__icon" aria-hidden="true">
        !
      </span>
      <p className="state__message">{message}</p>
      {onRetry ? (
        <button type="button" className="state__retry" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  );
}
