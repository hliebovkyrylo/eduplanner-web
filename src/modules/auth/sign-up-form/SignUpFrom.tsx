import { useSignUpMutation } from "@redux/api/authAPI";
import { AuthForm } from "../shared";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, signUpSchema } from "./schemas/signUpSchema";
import { Input } from "@components/Input";
import { useCallback } from "react";
import { RtkError } from "@typings/error";
import { Loading } from "@components/index";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback(
    async (values: FormData) => {
      signUp(values)
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error: RtkError) => {
          if (error.data.status_code === 409) {
            setError("email", {
              type: "manual",
              message: "Email already exists",
            });
          }
        });
    },
    [signUp]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthForm
      subtitle="Sign up your account"
      onSubmit={handleSubmit(onSubmit)}
      linkText="Already have an account?"
      linkActionText="Sign in"
      linkUrl="/sign-in"
    >
      <Input
        type="email"
        isError={!!errors.email}
        errorMessage={errors.email?.message}
        placeholder="Enter your email"
        {...register("email")}
      />
      <Input
        type="text"
        isError={!!errors.name}
        errorMessage={errors.name?.message}
        placeholder="Enter your name"
        {...register("name")}
      />
      <Input
        type="password"
        isError={!!errors.password}
        errorMessage={errors.password?.message}
        placeholder="Enter your password"
        {...register("password")}
      />
    </AuthForm>
  );
};
