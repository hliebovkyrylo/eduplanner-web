import { Input } from "@components/Input";
import { AuthForm } from "../shared";
import { useSignInMutation } from "@redux/api/authAPI";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RtkError } from "@typings/error";
import { useCallback } from "react";
import { FormData } from "./schemas/signInSchema";
import { Loading } from "@components/index";

export const SignInForm = () => {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: FormData) => {
      signIn(values)
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error: RtkError) => {
          if (
            error.data.status_code === 409 ||
            error.data.status_code === 404
          ) {
            setError("email", { message: "Wrong entered data!" });
            setError("password", { message: "Wrong entered data!" });
          }
        });
    },
    [signIn]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthForm
      subtitle="Sign in to access your account"
      onSubmit={handleSubmit(onSubmit)}
      linkText="Don't have an account?"
      linkActionText="Create one"
      linkUrl="/sign-up"
    >
      <Input
        isError={!!errors.email}
        placeholder="Enter your email"
        type="email"
        errorMessage={errors.email?.message}
        {...register("email")}
      />
      <Input
        isError={!!errors.password}
        placeholder="Enter your password"
        type="password"
        errorMessage={errors.email?.message}
        {...register("password")}
      />
    </AuthForm>
  );
};
