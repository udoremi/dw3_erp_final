'use client'; 

import Link from 'next/link';
import { useState } from 'react';
import { Building, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react'; 
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
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
          Service Desk ITSM
        </h1>
      </div>

      {/* Formulário */}
      <form className="space-y-4">
        {/* CAMPO DE E-MAIL */}
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

        {/* CAMPO DE SENHA */}
        <div className="relative space-y-2">
          <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
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

        {/* Checkbox e Link */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="remember" 
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary" 
            />
            <label htmlFor="remember" className="text-muted-foreground">
              Lembrar de mim
            </label>
          </div>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <Button type="submit" className="w-full mt-6">
          <span className="flex items-center justify-center gap-2">
            Entrar
            <ArrowRight className="h-5 w-5" />
          </span>
        </Button>
      </form>

      {/* Link de Cadastro */}
      <div className="text-center text-sm text-muted-foreground">
        Não tem uma conta?{' '}
        <Link
          href="/cadastro"
          className="font-medium text-primary hover:text-primary/90"
        >
          Crie uma agora
        </Link>
      </div>
    </div>
  );
}