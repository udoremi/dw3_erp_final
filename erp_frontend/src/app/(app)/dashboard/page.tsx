import { StatCard } from '@/components/ui/StatCard';
import { Ticket, UserCheck, Inbox } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-3xl font-bold text-foreground">
        Dashboard do Técnico
      </h1>
    
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Chamados Abertos (Total)"
          value="12"
          icon={Ticket}
        />
        <StatCard 
          title="Não Atribuídos"
          value="3"
          icon={Inbox}
        />
        <StatCard 
          title="Na sua Fila"
          value="4"
          icon={UserCheck}
        />
      </div>

      {/* Área de Gráficos */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="w-full rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-bold text-foreground">Chamados por Prioridade</h3>
          <p className="text-muted-foreground">Aqui vai ser um gráfico de pizza.</p>
        </div>
        <div className="w-full rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-bold text-foreground">Volume de Chamados (Últimos 7 dias)</h3>
          <p className="text-muted-foreground">Aqui vai ser um gráfico de barras.</p>
        </div>
      </div>
    </div>
  );
}