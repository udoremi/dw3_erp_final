'use client';

import Link from 'next/link';
import { FilePenLine, Trash2 } from 'lucide-react';

// 1. DADOS FALSOS
const usuariosMock = [
  {
    id: 1,
    nome: 'Admin do Sistema',
    username: 'admin',
    role: 'Admin',
    status: 'Ativo',
  },
  {
    id: 2,
    nome: 'Breno Candeu',
    username: 'breno.tecnico',
    role: 'Técnico',
    status: 'Ativo',
  },
  {
    id: 3,
    nome: 'Ana Silva (Financeiro)',
    username: 'ana.silva',
    role: 'Usuário',
    status: 'Ativo',
  },
  {
    id: 4,
    nome: 'Carlos Dias (Marketing)',
    username: 'carlos.dias',
    role: 'Usuário',
    status: 'Inativo',
  },
];

// Componente de etiqueta
function RoleBadge({ role }: { role: string }) {
  const roleColor = {
    Admin: 'bg-red-500/20 text-red-400',
    Técnico: 'bg-blue-500/20 text-blue-400',
    Usuário: 'bg-gray-500/20 text-gray-400',
  }[role] || 'bg-muted text-muted-foreground';

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${roleColor}`}
    >
      {role}
    </span>
  );
}

// Componente de etiqueta para o STATUS (Ativo/Inativo)
function StatusBadge({ status }: { status: string }) {
  const statusColor =
    status === 'Ativo'
      ? 'bg-green-500/20 text-green-400'
      : 'bg-gray-500/20 text-gray-400';

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
    >
      {status}
    </span>
  );
}

// Tabela de Usuários
export function UsuariosTable() {
  return (
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          {/* Cabeçalho da Tabela */}
          <thead className="border-b border-border bg-background">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Username</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Papel</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
              <th className="w-28 px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Ações</th>
            </tr>
          </thead>
          
          {/* Corpo da Tabela */}
          <tbody className="divide-y divide-border">
            {usuariosMock.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-background">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{usuario.nome}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{usuario.username}</td>
                <td className="px-4 py-3 text-sm">
                  <RoleBadge role={usuario.role} />
                </td>
                <td className="px-4 py-3 text-sm">
                  <StatusBadge status={usuario.status} />
                </td>
                
                {/* Botões de Ação (Editar e Desativar/Excluir) */}
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/usuarios/editar/${usuario.id}`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <FilePenLine className="h-5 w-5" />
                    </Link>
                    
                    <button
                      onClick={() => alert(`Desativar ${usuario.username}`)}
                      className="text-muted-foreground transition-colors hover:text-danger"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}