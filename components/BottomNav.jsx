'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calculator, Lightbulb, HelpCircle, BarChart2, Sprout, ShieldCheck } from 'lucide-react';

const navItems = [
  { href: '/',            label: 'Utama',     Icon: Home },
  { href: '/calculator',  label: 'Kalkulator', Icon: Calculator },
  { href: '/tips',        label: 'Tips',       Icon: Lightbulb },
  { href: '/quiz',        label: 'Quiz',       Icon: HelpCircle },
  { href: '/infografik',  label: 'Grafik',     Icon: BarChart2 },
  { href: '/agriculture', label: 'Tani',       Icon: Sprout },
  { href: '/admin/login', label: 'Admin',      Icon: ShieldCheck },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map(({ href, label, Icon }) => {
        const active = path === href;
        return (
          <Link key={href} href={href} className={`bottom-nav__item${active ? ' bottom-nav__item--active' : ''}`}>
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
