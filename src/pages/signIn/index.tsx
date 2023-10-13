import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import styles from "./signIn.module.scss";
import eye_slash from "../../assets/icons/eye-slash-solid.svg";
import eye from "../../assets/icons/eye-solid.svg";
import { fetchLogin, isAuthSelector } from "../../redux/slices/auth";

export const LoginPage = () => {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eye_slash);

  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
      setIcon(eye);
    } else {
      setType('password');
      setIcon(eye_slash);
    }
  };

  // functionality for sign in
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (val: any) => {
    try {
      const data = await dispatch<any>(fetchLogin(val));

      if (!data) {
        return alert('Failed to login!')
      }

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }

    } catch (error) {
      console.log(error);
      return alert('Failed to login!')
    }
  };

  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <section className={styles.loginPage}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <h1>Sign in</h1>
        <div>
          <input placeholder="Enter your email" className={styles.input} type="email" required {...register('email')} />
        </div>
        <div className={styles.inputs}>
          <input placeholder="Enter your password" className={styles.input} type={type} required {...register('password')} />
          <input onClick={togglePassInput} className={styles.checkbox} id="checkbox" type="checkbox" />
          <label className={styles.checkboxBtn} htmlFor="checkbox"><img className={styles.imgaye} src={icon} alt={""} /></label>
        </div>
        <button className={styles.btn} type="submit">Sign in</button>
        <a className={styles.href} href="/register">Don't have an account? Sign up</a>
      </form>
    </section>
  )
};