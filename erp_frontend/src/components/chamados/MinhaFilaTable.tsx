'use client';

import Link from 'next/link';
import { FilePenLine, Trash2 } from 'lucide-react';

const minhaFilaMock = [
  {
    id: 'TKT-002',
    titulo: 'Mouse quebrado',
    status: 'Em Andamento',
    prioridade: 'Média',
    usuario: 'Breno Candeu',
  },
  {
    id: 'TKT-004',
    titulo: 'Rede Wi-Fi instável no 2º andar',
    status: 'Aberto',
    prioridade: 'Alta',
    usuario: 'Diana Paes',
  },
];

// Componente de etiqueta para o Status
function StatusBadge({ status }: { status: string }) {
  const statusColor = {
    Aberto: 'bg-blue-500/20 text-blue-400',
    'Em Andamento': 'bg-yellow-500/20 text-yellow-400',
    Fechado: 'bg-green-500/20 text-green-400',
  }[status] || 'bg-muted text-muted-foreground';

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
    >
      {status}
    </span>
  );
}

// Tabela de Minha Fila
export function MinhaFilaTable() {
  return (
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="border-b border-border bg-background">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Título</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Prioridade</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Requisitante</th>
              <th className="w-28 px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Ações</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {minhaFilaMock.map((chamado) => (
              <tr key={chamado.id} className="hover:bg-background">
                <td className="px-4 py-3 text-sm font-medium text-primary">{chamado.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{chamado.titulo}</td>
                <td className="px-4 py-3 text-sm">
                  <StatusBadge status={chamado.status} />
                </td>
                <td className="px-4 py-3 text-sm text-foreground">{chamado.prioridade}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{chamado.usuario}</td>
                
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/chamados/editar/${chamado.id}`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <FilePenLine className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => alert(`Excluir ${chamado.id}`)}
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