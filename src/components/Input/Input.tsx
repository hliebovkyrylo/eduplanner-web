import { forwardRef } from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError: boolean;
  errorMessage?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isError, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          {...props}
          ref={ref}
          className={[styles.input, isError && styles.inputError].join(" ")}
        />
        {isError && <p className={styles.inputErrorText}>{errorMessage}</p>}
      </>
    );
  }
);
