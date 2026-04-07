'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PawPrint, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';

const schema = z.object({
  email: z.string().email('Email invalido'),
});

type ForgotPasswordForm = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: ForgotPasswordForm) {
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) {
        setError('Erro ao enviar email. Tente novamente.');
        return;
      }

      setSent(true);
    } catch {
      setError('Erro ao enviar email. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="lg:hidden flex items-center gap-2 mb-8">
        <div className="bg-amber-500 rounded-xl p-2">
          <PawPrint size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">PetCare</span>
      </div>

      <Link
        href="/login"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={14} />
        Voltar ao login
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">Recuperar senha</h1>
      <p className="text-gray-500 mt-1 mb-8">
        Informe seu email e enviaremos um link para redefinir sua senha.
      </p>

      {sent ? (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
          Email enviado! Verifique sua caixa de entrada e siga as instrucoes para redefinir sua senha.
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-9 text-gray-400" />
              <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                className="pl-9"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Enviar link de recuperacao
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
