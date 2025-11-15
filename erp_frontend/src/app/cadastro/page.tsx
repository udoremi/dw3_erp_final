'use client'; 

import Link from 'next/link';
import { useState } from 'react';
import { User, Mail, Lock, ArrowRight, Building, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterPage() {
  // Estado que controla o ver/esconder senha
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="w-full max-w-md space-y-6 rounded-lg 
                    border border-border bg-card p-8 shadow-sm">

      {/* Logo e Título */}
      <div className="flex w-full flex-col items-center justify-center space-y-2">
        <div className="flex h-16 w-16 items-center justify-center 
                        rounded-lg bg-background border border-border">
          <Building className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Criar sua Conta
        </h1>
      </div>

      {/* Formulário */}
      <form className="space-y-4">
        {/* Campo de Nome */}
        <div className="relative space-y-2">
          <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Nome Completo"
            className="pl-12"
            required
          />
        </div>

        {/* Campo de E-mail */}
        <div className="relative space-y-2">
          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Endereço de E-mail"
            className="pl-12"
            required
          />
        </div>

        {/* Campo de Senha */}
        <div className="relative space-y-2">
          <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Crie uma senha forte"
            className="pl-12 pr-12" 
            required
          />
          {/* Botão de ver senha */}
          <button
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Botão de Submit */}
        <Button type="submit" className="w-full mt-6">
          <span className="flex items-center justify-center gap-2">
            Criar Conta
            <ArrowRight className="h-5 w-5" />
          </span>
        </Button>
      </form>

      {/* Link de Login */}
      <div className="text-center text-sm text-muted-foreground mt-8">
        Já tem uma conta?{' '}
        <Link
          href="/login"
          className="font-medium text-primary hover:text-primary/90"
        >
          Faça login
        </Link>
      </div>
    </div>
  );
}