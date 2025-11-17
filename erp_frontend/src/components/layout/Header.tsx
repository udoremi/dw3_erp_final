'use client';

import Link from 'next/link';
import { Building, User, LogOut } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border bg-card px-6">
      {/* Menu do Usuário */}
      <div className="flex items-center gap-4">
        <details className="relative">
          <summary className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-background">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <User className="h-5 w-5" />
            </div>
            <span className="hidden text-sm font-medium text-foreground md:inline">
              Teste 01
            </span>
          </summary>
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-11 w-48 rounded-lg border border-border bg-card p-2 shadow-lg">
            <Link
              href="/perfil"
              className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground"
            >
              <User className="h-4 w-4" />
              Meu Perfil
            </Link>
            <Link
              href="/login" // Link para deslogar
              className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-red-500 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}