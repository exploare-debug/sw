import type { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-20 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
