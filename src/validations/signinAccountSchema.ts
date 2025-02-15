import { z } from 'zod';

export const signinAccountSchema = z.object({
  email: z
    .string()
    .email('Formato de e-mail inválido')
    .nonempty('E-mail é obrigatório'),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .nonempty('Senha é obrigatória'),
});
