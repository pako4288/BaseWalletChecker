import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { NetworkStatsCards } from '../components/network/NetworkStatsCards';
import { WalletChecker } from '../components/wallet/WalletChecker';

export function HomePage() {
  return (
    <>
      <Header />
      <main className="app-container home-page">
        <NetworkStatsCards />
        <WalletChecker />
      </main>
      <Footer />
    </>
  );
}
