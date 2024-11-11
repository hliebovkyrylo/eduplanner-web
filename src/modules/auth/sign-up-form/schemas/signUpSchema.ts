import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
});

export type FormData = z.infer<typeof signUpSchema>;
