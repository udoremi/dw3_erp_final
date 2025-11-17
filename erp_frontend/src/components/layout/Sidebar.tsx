'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building,
  LayoutDashboard,
  Ticket,
  Settings,
  PlusSquare,
  BookUser,
  ClipboardList,
  UserCheck,
} from 'lucide-react';

type UserRole = 'padrao' | 'tecnico' | 'admin';
const useAuth = () => {
  const mockUserRole: UserRole = 'padrao'; // 'padrao', 'tecnico' ou 'admin'
  return { role: mockUserRole };
};


// TODOS os links possíveis
const linkMap = {
  // Links do Usuário Padrão
  novoChamado: {
    href: '/chamados/novo',
    label: 'Abrir Chamado',
    icon: PlusSquare,
  },
  meusChamadosUsuario: {
    href: '/meus-chamados',
    label: 'Meus Chamados',
    icon: BookUser,
  },
  
  // Links do Técnico
  dashboard: {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  gerenciarChamados: {
    href: '/chamados',
    label: 'Gerenciar Chamados',
    icon: ClipboardList,
  },
  meusChamadosTecnico: {
    href: '/chamados/minha-fila',
    label: 'Meus Chamados',
    icon: Ticket,
  },

  // Link do Admin
  gerenciarUsuarios: {
    href: '/admin/usuarios',
    label: 'Gerenciar Usuários',
    icon: UserCheck,
  },

  // Link Comum
  perfil: {
    href: '/perfil',
    label: 'Meu Perfil',
    icon: Settings,
  },
};

// 2. Definição dos Menus por Papel
const navLinksByRole = {
  padrao: [
    linkMap.novoChamado, 
    linkMap.meusChamadosUsuario, 
  ],
  tecnico: [
    linkMap.dashboard,
    linkMap.gerenciarChamados,
    linkMap.meusChamadosTecnico,
  ],
  admin: [
    linkMap.dashboard,
    linkMap.gerenciarChamados,
    linkMap.meusChamadosTecnico,
    linkMap.gerenciarUsuarios,
  ],
};


export function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth(); // Pega o papel do usuário (simulado)

  // Decide qual array de links usar
  const linksToShow = navLinksByRole[role] || navLinksByRole.padrao;

  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 border-r border-border bg-card lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 w-full items-center gap-3 px-6">
        <Building className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold text-foreground">Service Desk</span>
      </div>

      {/* Navegação Dinâmica */}
      <nav className="flex flex-col gap-2 p-4">
        {linksToShow.map((link) => {
          // Lógica para destacar o link ativo
          const isActive = (link.href === '/' && pathname === '/') || 
                           (link.href !== '/' && pathname.startsWith(link.href));
          
          return (
            <Link
              key={link.href}
              href={link.href}
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