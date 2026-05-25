import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="app-container header__inner">
        <div className="header__brand">
          <span className="header__logo" aria-hidden="true">
            ◆
          </span>
          <div>
            <h1 className="header__title">Base Wallet Checker</h1>
            <p className="header__subtitle">Wallet activity on Base network</p>
          </div>
        </div>
        <span className="header__badge">Base L2</span>
      </div>
    </header>
  );
}
