import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button'; // Nosso botão reutilizável
import { ChamadosTable } from '@/components/chamados/ChamadosTable'; // A tabela que acabamos de criar

export default function ChamadosPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header da Página (Título + Botão) */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Gerenciar Chamados
        </h1>
        
        {/* Este Link leva para a página de formulário, conforme regra do evandro (sem modal). */}
        {/* <Link href="/chamados/novo">
          <Button>
            <span className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Novo Chamado
            </span>
          </Button>
        </Link> */}
      </div>

      {/* Tabela */}
      <ChamadosTable />
    </div>
  );
}