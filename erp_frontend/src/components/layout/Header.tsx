'use client'; 

import Link from 'next/link';
import { User, LogOut } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center border-b border-border bg-card px-6">

      {/* Menu do Usuário */}
      <div className="ml-auto flex items-center gap-4">
        <details className="relative">
          <summary className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-background">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <User className="h-5 w-5" />
            </div>
            <span className="hidden text-sm font-medium text-foreground md:inline">
              Breno Candeu
            </span>
          </summary>
          
          {/* Dropdown Menu */}
          <div 
            className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card p-2 shadow-lg
                       
                       /* Seta (Borda) */
                       before:absolute
                       before:-top-2 before:right-4
                       before:h-0 before:w-0
                       before:border-b-[8px] before:border-l-[8px] before:border-r-[8px]
                       before:border-b-border
                       before:border-l-transparent before:border-r-transparent

                       /* Seta (Preenchimento) */
                       after:absolute
                       after:-top-[7px] after:right-[17px]
                       after:h-0 after:w-0
                       after:border-b-[7px] after:border-l-[7px] after:border-r-[7px]
                       after:border-b-card
                       after:border-l-transparent after:border-r-transparent
                      "
          >
            
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