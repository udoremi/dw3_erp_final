import { MinhaFilaTable } from '@/components/chamados/MinhaFilaTable';

export default function MinhaFilaPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Minha Fila (Meus Chamados)
        </h1>
      </div>

      <MinhaFilaTable />
    </div>
  );
}