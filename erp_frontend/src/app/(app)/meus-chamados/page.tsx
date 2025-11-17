import { MeusChamadosTable } from '@/components/chamados/MeusChamadosTable';

export default function MeusChamadosPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Meus Chamados
        </h1>
      </div>

      <MeusChamadosTable />
    </div>
  );
}