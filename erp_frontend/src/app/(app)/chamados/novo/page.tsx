'use client';

import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';

export default function NovoChamadoPage() {

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Abrir Novo Chamado
          </h1>
          <p className="text-muted-foreground">
            Descreva seu problema para que nossa equipe possa ajudar.
          </p>
        </div>
      </div>

      <form className="w-full rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          
          {/* CAMPO TÍTULO */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Ex: Minha impressora não está funcionando"
              required
            />
          </div>

          {/* CAMPO DESCRIÇÃO */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Detalhe o problema: o que aconteceu, quando, e o que você já tentou fazer."
              required
            />
          </div>

          {/* CAMPO CATEGORIA */}
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Select id="categoria" defaultValue="">
              <option value="" disabled>Selecione uma categoria</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Rede">Rede</option>
              <option value="Acesso">Acesso/Senha</option>
              <option value="Outro">Outro</option>
            </Select>
          </div>

          {/* CAMPO PRIORIDADE */}
          <div className="space-y-2">
            <Label htmlFor="prioridade">Prioridade</Label>
            <Select id="prioridade" defaultValue="Baixa">
              <option value="Baixa">Baixa (Problema não urgente)</option>
              <option value="Media">Média (Afeta meu trabalho)</option>
              <option value="Alta">Alta (Impede meu trabalho)</option>
            </Select>
          </div>

          {/* Botão de Enviar */}
          <Button type="submit" className="w-full !mt-6">
            <span className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Enviar Chamado
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}