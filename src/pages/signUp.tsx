import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchReg, isAuthSelector } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";

import styles from "./signIn/signIn.module.scss";
import eye_slash from "../assets/icons/eye-slash-solid.svg";
import eye from "../assets/icons/eye-solid.svg";

export const SignUpPage = () => {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eye_slash);
  const dispatch = useDispatch();

  // show/hide password
  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
      setIcon(eye);
    } else {
      setType('password');
      setIcon(eye_slash);
    }
  };

  // functionality for register
  const isAuth = useSelector(isAuthSelector)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (val: any) => {
    try {
      const data = await dispatch<any>(fetchReg(val));

      if (!data) {
        alert('Ошибка при регистрации!');
        return;
      }

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      alert('Произошла ошибка при отправке запроса.');
      console.error(error);
    }
  };

  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <section className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign up</h1>
        <div>
          <input placeholder="Enter your email" className={styles.input} type="email" required {...register('email')} />
        </div>
        <div className={styles.inputs}>
          <input placeholder="Create your password" className={styles.input} type={type} required {...register('password')} />
          <input onClick={togglePassInput} className={styles.checkbox} id="checkbox" type="checkbox" />
          <label className={styles.checkboxBtn} htmlFor="checkbox"><img className={styles.imgaye} src={icon} alt={""} /></label>
        </div>
        <button className={styles.btn} type="submit">Sign in</button>
        <a className={styles.href} href="#">Already have an account? Sign in</a>
      </form>
    </section>
  )
};