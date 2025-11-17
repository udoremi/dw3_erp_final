'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building,
  LayoutDashboard,
  Ticket,
  Users,
  HardDrive,
  Settings,
} from 'lucide-react';

// Definição dos links
const navLinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/chamados',
    label: 'Chamados',
    icon: Ticket,
  },
  {
    href: '/usuarios',
    label: 'Usuários',
    icon: Users,
  },
  {
    href: '/equipamentos',
    label: 'Equipamentos',
    icon: HardDrive,
  },
  {
    href: '/perfil',
    label: 'Meu Perfil',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname(); // Hook para saber a rota atual

  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 border-r border-border bg-card lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 w-full items-center gap-3 px-6">
        <Building className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold text-foreground">Service Desk</span>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-2 p-4">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              // Lógica do link ativo
              className={`flex items-center gap-3 rounded-lg px-4 py-3
                          text-muted-foreground transition-colors 
                          hover:text-foreground
                          ${isActive ? 'bg-primary/20 text-primary' : 'hover:bg-background'}`}
            >
              <link.icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}