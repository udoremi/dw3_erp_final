'use client';

import Link from 'next/link';
import { Eye } from 'lucide-react';

// DADOS FALSOS
const meusChamadosMock = [
  {
    id: 'TKT-002',
    titulo: 'Mouse quebrado',
    status: 'Em Andamento',
    prioridade: 'Média',
    data_abertura: '2025-11-16 10:30',
  },
  {
    id: 'TKT-005',
    titulo: 'Não consigo acessar a pasta X',
    status: 'Aberto',
    prioridade: 'Baixa',
    data_abertura: '2025-11-17 09:15',
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

// Tabela de Meus Chamados
export function MeusChamadosTable() {
  return (
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="border-b border-border bg-background">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Título</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Data de Abertura</th>
              <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Ações</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {meusChamadosMock.map((chamado) => (
              <tr key={chamado.id} className="hover:bg-background">
                <td className="px-4 py-3 text-sm font-medium text-primary">{chamado.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{chamado.titulo}</td>
                <td className="px-4 py-3 text-sm">
                  <StatusBadge status={chamado.status} />
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{chamado.data_abertura}</td>

                <td className="px-4 py-3 text-sm">
                  <Link
                    href={`/meus-chamados/${chamado.id}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}