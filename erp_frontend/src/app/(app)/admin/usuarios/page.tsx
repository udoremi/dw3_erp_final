import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { UsuariosTable } from '@/components/admin/UsuariosTable';

export default function GerenciarUsuariosPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Gerenciar Usuários
        </h1>
      </div>

      {/* Tabela */}
      <UsuariosTable />
    </div>
  );
}