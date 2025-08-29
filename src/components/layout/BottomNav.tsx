'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Map,
  ShieldAlert,
  HeartPulse,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/map', icon: Map, label: 'Map' },
  { href: '/report-incident', icon: ShieldAlert, label: 'Report' },
  { href: '/health-report', icon: HeartPulse, label: 'Health' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-md transition-colors text-muted-foreground hover:text-foreground',
                isActive && 'text-accent'
              )}
            >
              <item.icon className="size-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
