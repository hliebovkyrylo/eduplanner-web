import { AuthLayout } from "@modules/layouts";
import { SignUpForm } from "@modules/auth";

export const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};
