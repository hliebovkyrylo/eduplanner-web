import { useCallback, useState } from "react";
import { z }                     from "zod"
import { useSelector }           from "react-redux";
import { IAppState }             from "@redux/store";
import { Navigate }              from "react-router-dom";
import { useSignInMutation }     from "@redux/api/authAPI";
import { useForm }               from "react-hook-form";
import { RtkError }              from "@typings/error";
import { Error }                 from "@components/index";
import styles                    from "../auth.module.scss";
import eye                       from "@assets/icons/eye-solid.svg";
import eyeSlash                  from "@assets/icons/eye-slash-solid.svg";

const signInSchema = z.object({
  email   : z.string().email(),
  password: z.string(),
});

export type FormData = z.infer<typeof signInSchema>;

export const SignIn = () => {
  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);
  const [signIn]    = useSignInMutation();

  const { handleSubmit, setError, register, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email   : '',
      password: '',
    },
  });

  const onSubmit = useCallback((values: FormData) => {
    signIn(values).unwrap().catch((error: RtkError) => {
      if (error.data.code === 'user-not-found') {
        setError('email', { message: "Email not found!" })
      }

      if (error.data.code === 'wrong-password') {
        setError('password', { message: "Wrong entered data!" })
      }
    })
  }, [signIn]);

  const [inputType, setinputType] = useState("password");
  const handleChangeVisibility = (event: React.FormEvent) => {
    event.preventDefault();
    setinputType(inputType === 'password' ? 'text' : 'password');
  };

  if (accessToken) {
    return <Navigate to="/" />
  }

  return (
    <>
      <main className={styles.auth}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
          <h2 className={styles.authTitle}>EduPlanner</h2>
          <p className={styles.authSubtitle}>Sign in to access your account</p>
          <div className={styles.inputItem}>
            <label className={styles.authLabel} htmlFor="email">Email address</label>
            <input 
              className={[styles.authInput, errors.email ? styles.inputError : ''].join(' ')} 
              type="email" 
              {...register('email')}
              name="email" 
              placeholder="example@example.com" 
            />
          </div>
          <div className={styles.inputItem}>
            <label className={styles.authLabel} htmlFor="password">Password</label>
            <input 
              className={[styles.authInput, errors.password || errors.email ? styles.inputError : ''].join(' ')} 
              type={inputType} 
              {...register('password')} 
              name="password" 
              placeholder="Your Password" 
            />
            <button onClick={handleChangeVisibility} type="button"><img className={styles.authEye} src={inputType === 'password' ? eyeSlash : eye} alt="eye" /></button>
          </div>
          <button className={styles.authButton}>Sign In</button>
          <p className={styles.authLink}>Don't have an account yet? <a className={styles.link} href="/sign-up">Sign Up</a>.</p>
        </form>
      </main>
      {(errors.password || errors.email) && (
        <Error errorText={ errors.password?.message as string || errors.email?.message as string} />
      )}
    </>
  )
}