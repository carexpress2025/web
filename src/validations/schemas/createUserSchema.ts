import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  accountId: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .int()
      .positive('accountId precisa ser um número inteiro positivo'),
  ),
});
