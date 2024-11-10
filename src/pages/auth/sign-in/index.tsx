import { SignInForm } from "@modules/auth";
import { AuthLayout } from "@modules/layouts";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type FormData = z.infer<typeof signInSchema>;

export const SignIn = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};
